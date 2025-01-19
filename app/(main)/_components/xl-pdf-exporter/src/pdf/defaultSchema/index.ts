import { pdfBlockMappingForDefaultSchema } from "./blocks";
import { pdfInlineContentMappingForDefaultSchema } from "./inlinecontent";
import { pdfStyleMappingForDefaultSchema } from "./styles";

export const pdfDefaultSchemaMappings = {
  blockMapping: pdfBlockMappingForDefaultSchema,
  inlineContentMapping: pdfInlineContentMappingForDefaultSchema,
  styleMapping: pdfStyleMappingForDefaultSchema,
};
