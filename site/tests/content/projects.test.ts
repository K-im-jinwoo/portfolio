import { describe, expect, it } from "vitest";
import {
  additionalProjects,
  featuredProjects,
  getProjectBySlug,
  projects,
} from "@/content/projects";
import { profile } from "@/content/profile";

describe("portfolio content", () => {
  it("contains five unique projects split 3 and 2", () => {
    expect(projects).toHaveLength(5);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(5);
    expect(featuredProjects).toHaveLength(3);
    expect(additionalProjects).toHaveLength(2);
  });

  it("resolves every slug and includes required case-study fields", () => {
    for (const project of projects) {
      expect(getProjectBySlug(project.slug)).toEqual(project);
      expect(project.problem.length).toBeGreaterThan(20);
      expect(project.solution.length).toBeGreaterThan(20);
      expect(project.result.length).toBeGreaterThan(20);
      expect(project.stack.length).toBeGreaterThan(0);
    }
  });

  it("publishes email but never a phone number", () => {
    expect(profile.email).toBe("jwkim6166@gmail.com");
    expect(JSON.stringify(profile)).not.toMatch(
      /01[016789][- ]?\d{3,4}[- ]?\d{4}/,
    );
  });
});
