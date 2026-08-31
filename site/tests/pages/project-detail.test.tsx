import { describe, expect, it } from "vitest";
import { generateStaticParams } from "@/app/projects/[slug]/page";
import { getProjectBySlug } from "@/content/projects";

describe("project detail routes", () => {
  it("generates one route for every project", () => {
    expect(generateStaticParams()).toEqual([
      { slug: "excel-data-converter" },
      { slug: "wiki-knowledge-system" },
      { slug: "academic-transfer-workflow" },
      { slug: "excel-export-optimization" },
      { slug: "lg-voc-dashboard" },
    ]);
  });

  it("returns undefined for an unknown project", () => {
    expect(getProjectBySlug("missing-project")).toBeUndefined();
  });
});
