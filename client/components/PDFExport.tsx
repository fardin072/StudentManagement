import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MCQSet } from "@shared/api";
import jsPDF from "jspdf";
import { Loader } from "lucide-react";

interface PDFExportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mcqSet: MCQSet;
}

export default function PDFExport({
  open,
  onOpenChange,
  mcqSet,
}: PDFExportProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    try {
      setIsGenerating(true);

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 10;
      const contentWidth = pageWidth - 2 * margin;
      let yPosition = margin;

      const addPageIfNeeded = (spaceNeeded: number) => {
        if (yPosition + spaceNeeded > pageHeight - margin) {
          doc.addPage();
          yPosition = margin;
        }
      };

      // Set font for title
      doc.setFontSize(16);
      doc.setTextColor(0, 0, 0);
      doc.text(mcqSet.title, pageWidth / 2, yPosition, { align: "center" });
      yPosition += 8;

      // Topic
      doc.setFontSize(10);
      doc.text(`Topic: ${mcqSet.topic}`, pageWidth / 2, yPosition, {
        align: "center",
      });
      yPosition += 6;

      // Meta information
      doc.setFontSize(8);
      const metaText = `Total Questions: ${mcqSet.questions.length} | Difficulty: ${mcqSet.difficulty.toUpperCase()} | Date: ${new Date().toLocaleDateString()}`;
      doc.text(metaText, pageWidth / 2, yPosition, { align: "center" });
      yPosition += 8;

      // Separator line
      doc.setDrawColor(0);
      doc.line(margin, yPosition, pageWidth - margin, yPosition);
      yPosition += 6;

      // Instructions
      doc.setFontSize(8);
      doc.setFont(undefined, "bold");
      doc.text("Instructions:", margin, yPosition);
      yPosition += 4;

      doc.setFont(undefined, "normal");
      const instructions = [
        "• Select the correct answer for each question",
        "• Each question has only one correct answer",
        "• Mark your answers clearly",
        "• Total Time: Unlimited",
      ];

      instructions.forEach((instruction) => {
        addPageIfNeeded(3);
        doc.text(instruction, margin + 2, yPosition);
        yPosition += 3;
      });

      yPosition += 4;

      // Two-column layout for questions
      const questionsPerColumn = Math.ceil(mcqSet.questions.length / 2);
      const columnWidth = (contentWidth - 3) / 2; // 3mm gap between columns

      // Process questions in pairs
      for (let i = 0; i < questionsPerColumn; i++) {
        const leftQuestion = mcqSet.questions[i];
        const rightQuestion =
          i + questionsPerColumn < mcqSet.questions.length
            ? mcqSet.questions[i + questionsPerColumn]
            : null;

        // Get heights needed for both columns
        const leftHeight = getQuestionHeight(leftQuestion);
        const rightHeight = rightQuestion ? getQuestionHeight(rightQuestion) : 0;
        const maxHeight = Math.max(leftHeight, rightHeight);

        addPageIfNeeded(maxHeight + 2);

        // Draw left column
        const leftX = margin;
        drawQuestion(
          doc,
          leftQuestion,
          leftX,
          yPosition,
          columnWidth,
          i + 1
        );

        // Draw right column
        if (rightQuestion) {
          const rightX = margin + columnWidth + 3;
          drawQuestion(
            doc,
            rightQuestion,
            rightX,
            yPosition,
            columnWidth,
            i + questionsPerColumn + 1
          );
        }

        yPosition += maxHeight + 2;
      }

      // Add answer sheet at the end
      yPosition += 4;
      addPageIfNeeded(15);

      doc.setFontSize(10);
      doc.setFont(undefined, "bold");
      doc.text("Answer Sheet:", margin, yPosition);
      yPosition += 6;

      // Answer boxes
      doc.setFontSize(8);
      doc.setFont(undefined, "normal");

      const boxSize = 5;
      const boxSpacing = 2;
      const boxesPerRow = Math.floor(
        (contentWidth - 4) / (boxSize + boxSpacing)
      );

      for (let i = 0; i < mcqSet.questions.length; i++) {
        if (i % boxesPerRow === 0) {
          yPosition += 8;
          addPageIfNeeded(10);
        }

        const x = margin + 2 + (i % boxesPerRow) * (boxSize + boxSpacing);

        // Draw box
        doc.setDrawColor(0);
        doc.rect(x, yPosition, boxSize, boxSize);

        // Draw question number
        doc.setFontSize(7);
        doc.text(String(i + 1), x + boxSize / 2, yPosition - 1, {
          align: "center",
        });
      }

      // Save the PDF
      doc.save(
        `${mcqSet.title.replace(/\s+/g, "_")}_exam.pdf`
      );
      onOpenChange(false);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Download MCQ Exam Sheet</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              {mcqSet.title}
            </h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>
                <strong>Topic:</strong> {mcqSet.topic}
              </p>
              <p>
                <strong>Questions:</strong> {mcqSet.questions.length}
              </p>
              <p>
                <strong>Difficulty:</strong>{" "}
                {mcqSet.difficulty.charAt(0).toUpperCase() +
                  mcqSet.difficulty.slice(1)}
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg space-y-2 text-sm">
            <p className="font-semibold">PDF Features:</p>
            <ul className="space-y-1 text-gray-700">
              <li>✓ Two-column black & white layout</li>
              <li>✓ Radio buttons for answer selection</li>
              <li>✓ Answer sheet grid included</li>
              <li>✓ Professional exam format</li>
              <li>✓ Ready to print</li>
            </ul>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isGenerating}
          >
            Cancel
          </Button>
          <Button
            onClick={generatePDF}
            disabled={isGenerating}
            className="bg-primary hover:bg-primary/90 text-white"
          >
            {isGenerating ? (
              <>
                <Loader className="h-4 w-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              "Download PDF"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function getQuestionHeight(question: any): number {
  // Estimate height: 4 for question text + 3 per option + 1 padding
  return 4 + question.options.length * 3 + 1;
}

function drawQuestion(
  doc: jsPDF,
  question: any,
  x: number,
  y: number,
  width: number,
  questionNumber: number
): void {
  let currentY = y;
  const lineHeight = 3;
  const smallFontSize = 7;

  doc.setFontSize(8);
  doc.setFont(undefined, "bold");

  // Question number and text
  const questionText = `Q${questionNumber}. ${question.question}`;
  const splitQuestion = doc.splitTextToSize(questionText, width - 2);

  splitQuestion.forEach((line: string, index: number) => {
    if (index === 0) {
      doc.setFont(undefined, "bold");
      doc.text(line, x + 1, currentY);
    } else {
      doc.setFont(undefined, "normal");
      doc.text(line, x + 1, currentY);
    }
    currentY += lineHeight;
  });

  currentY += 1;

  // Options
  doc.setFont(undefined, "normal");
  doc.setFontSize(smallFontSize);

  question.options.forEach((option: any, optIndex: number) => {
    const optionText = `${String.fromCharCode(65 + optIndex)}. ${option.text}`;
    const splitOption = doc.splitTextToSize(optionText, width - 4);

    // Radio button
    doc.circle(x + 2, currentY - 0.5, 0.8);

    splitOption.forEach((line: string, lineIndex: number) => {
      doc.text(line, x + 4, currentY);
      if (lineIndex < splitOption.length - 1) {
        currentY += lineHeight - 1;
      }
    });

    currentY += lineHeight;
  });
}
