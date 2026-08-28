import { spawnSync } from "node:child_process";

const originalCwd = process.cwd();
const needsAsciiAlias =
  process.platform === "win32" && /[^\x00-\x7F]/.test(originalCwd);

function runBuild(cwd) {
  if (process.platform === "win32") {
    return spawnSync(
      process.env.ComSpec ?? "cmd.exe",
      ["/d", "/s", "/c", "node_modules\\.bin\\vinext.cmd build"],
      { cwd, stdio: "inherit" },
    );
  }

  return spawnSync("node_modules/.bin/vinext", ["build"], {
    cwd,
    stdio: "inherit",
  });
}

function reserveAsciiDrive() {
  for (let code = "Z".charCodeAt(0); code >= "P".charCodeAt(0); code -= 1) {
    const drive = `${String.fromCharCode(code)}:`;
    const mounted = spawnSync("subst", [drive, originalCwd], {
      stdio: "ignore",
    });

    if (mounted.status === 0) return drive;
  }

  throw new Error("No free drive letter is available for the Windows build.");
}

let aliasDrive;

try {
  aliasDrive = needsAsciiAlias ? reserveAsciiDrive() : undefined;
  const result = runBuild(aliasDrive ? `${aliasDrive}\\` : originalCwd);

  if (result.error) throw result.error;
  process.exitCode = result.status ?? 1;
} finally {
  if (aliasDrive) {
    spawnSync("subst", [aliasDrive, "/D"], { stdio: "ignore" });
  }
}
