import {
    BlockNoteSchema,
    createBlockSpec,
    createInlineContentSpec,
    createStyleSpec,
    defaultBlockSpecs,
    defaultInlineContentSpecs,
    defaultStyleSpecs,
  } from "@blocknote/core";
  import { PDFExporter } from "@blocknote/xl-pdf-exporter";
  import { pdfDefaultSchemaMappings } from "@/app/(main)/_components/xl-pdf-exporter/src/pdf/defaultSchema";
  
  const customSchema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      extraBlock: createBlockSpec(
        {
          content: "none",
          type: "extraBlock",
          propSchema: {},
        },
        {}
      ),
    },
    inlineContentSpecs: {
      ...defaultInlineContentSpecs,
      extraInlineContent: createInlineContentSpec(
        {
          type: "extraInlineContent",
          content: "styled",
          propSchema: {},
        },
        {}
      ),
    },
    styleSpecs: {
      ...defaultStyleSpecs,
      extraStyle: createStyleSpec(
        {
          type: "extraStyle",
          propSchema: "boolean",
        },
        {}
      ),
    },
  });
  
  export const exporter = new PDFExporter(customSchema, {
    blockMapping: {
      ...pdfDefaultSchemaMappings.blockMapping,
      extraBlock: () => {
        throw new Error("Extra block not implemented");
      },
    },
    inlineContentMapping: {
      ...pdfDefaultSchemaMappings.inlineContentMapping,
      extraInlineContent: () => {
        throw new Error("Extra inline content not implemented");
      },
    },
    styleMapping: {
      ...pdfDefaultSchemaMappings.styleMapping,
      extraStyle: () => {
        throw new Error("Extra style not implemented");
      },
    },
  });
  