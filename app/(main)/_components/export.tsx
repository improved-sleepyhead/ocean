import React from "react"
import { Doc } from "@/convex/_generated/dataModel"
import { Font, Text } from "@react-pdf/renderer"
import ReactPDF from "@react-pdf/renderer"
import { exporter } from "./exporter"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

interface ExportProps {
  initialData: Doc<"documents">
}

Font.register({
  family: "GeistMono",
  src: "/assets/GeistMono-Regular.ttf"
})

const ExportButton: React.FC<ExportProps> = ({ initialData }) => {
  const handleExportPDF = async () => {
    try {
      const { content, title } = initialData

      if (!content) {
        throw new Error("Content is missing in the document.")
      }

      const parsedContent = JSON.parse(content)

      if (!Array.isArray(parsedContent)) {
        throw new Error("Parsed content is not an array.")
      }

      const pdfDocument = await exporter.toReactPDFDocument(parsedContent, {
        // header: (
        //     <View>
        //         {/* Обложка */}
        //         {coverImage && (
        //             <Image
        //                 src={coverImage}
        //                 style={{
        //                     width: "100%",
        //                     height: 100,
        //                     marginBottom: 20,
        //                     objectFit: "cover",
        //                 }}
        //             />
        //         )}
        //         {/* Заголовок с эмодзи */}
        //         <Text
        //             style={{
        //                 textAlign: "left",
        //                 fontSize: 24,
        //                 fontWeight: "bold",
        //                 marginBottom: 10,
        //             }}
        //         >
        //             {icon && `${icon} `}{title}
        //         </Text>
        //         <View style={{ marginBottom: 14 }} />
        //     </View>
        // ),
        footer: (
          <Text
            style={{
              fontFamily: "GeistMono",
              textAlign: "center",
              fontSize: 8
            }}
          >
            Экспортировано из Ocean app
          </Text>
        )
      })

      const blob = await ReactPDF.pdf(pdfDocument).toBlob()
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.download = `${title || "untitled"}.pdf`
      link.click()
      URL.revokeObjectURL(url)

      toast.success("Документ успешно экспортирован в PDF!")
    } catch (error) {
      console.error("Ошибка экспорта PDF:", error)
      toast.error("Ошибка при экспорте документа в PDF.")
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="text-sm"
      onClick={handleExportPDF}
    >
      <FileText className="text-muted-foreground w-4 h-4 mr-2" />
      Сохранить в PDF
    </Button>
  )
}

export default ExportButton
