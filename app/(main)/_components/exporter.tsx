import { BlockNoteSchema } from "@blocknote/core"
import { PDFExporter } from "@blocknote/xl-pdf-exporter"

import { pdfDefaultSchemaMappings } from "@/lib/pdfSchemaMappings"

const schema = BlockNoteSchema.create()

export const exporter = new PDFExporter(schema, pdfDefaultSchemaMappings)
