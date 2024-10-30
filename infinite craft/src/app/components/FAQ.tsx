"use client";

import BackgroundOverlay from "@/components/common/BackgroundOverlay";
import { Colors } from "@/utils/enums/colors";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { Collapse, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
interface Props {
  question: string;
  answer: any;
}
const parseAnswer = (answer: string) => {
  const parts = answer.split("~");
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <Link
          key={index}
          href={"/prompt-library"}
          style={{ color: "white", textDecoration: "underline" }}
        >
          {part}
        </Link>
      );
    } else {
      return part;
    }
  });
};
const QuestionAnswer = ({ question, answer }: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <Stack
      onClick={() => setShowAnswer(!showAnswer)}
      direction={"row"}
      spacing={4}
      sx={{
        padding: { lg: "2rem", xs: "1rem 0.5rem" },
        border: "0.06rem dashed #2D969B",
        borderRadius: "1.5rem",
        ".largeSvg": {
          display: { lg: "initial", xs: "none" },
          transform: showAnswer ? "rotate(0deg)" : "rotate(180deg)",
          transition: "all 0.3s ease",
        },
        ".smallSvg": {
          display: { lg: "none", xs: "initial" },
          transform: showAnswer ? "rotate(0deg)" : "rotate(180deg)",
          transition: "all 0.3s ease",
        },
      }}
    >
      <Stack
        sx={{ flex: "1", transition: "all 0.3s ease", gap: showAnswer ? 4 : 0 }}
      >
        <Typography
          sx={{
            color: Colors.GHOST_WHITE,
            fontSize: { lg: "1.75rem", xs: "1.25rem" },
            fontWeight: "600",
            textTransform: "capitalize",
            cursor: "pointer",
          }}
        >
          {question}
        </Typography>
        <Collapse in={showAnswer}>
          <Typography sx={{ fontSize: "1rem" }}>{answer}</Typography>
        </Collapse>
      </Stack>

      <ExpandMoreOutlinedIcon
        sx={{
          width: { lg: "1.875rem", xs: "1.25rem" },
          height: { lg: "1.875rem", xs: "1.25rem" },
          transform: showAnswer ? "rotate(180deg)" : "rotate(0deg)",
          transition: "all 0.3s",
          cursor: "pointer",
          ":hover": { color: Colors.ZOMP },
        }}
      />
    </Stack>
  );
};

const questionsAndAnswers = [
  {
    question: `What is Infinite Craft and How Does It Work?`,
    answer: `Infinite Craft is an AI tool that enhances your prompts, ensuring more accurate and relevant responses from AI systems. It's ideal for a variety of professional and creative applications, streamlining the process of generating targeted, high-quality AI outputs.`,
  },
  {
    question: "Can I Try Infinite Craft Before Subscribing?",
    answer: `Absolutely! Sign up to receive 10 free prompts. To unlock unlimited prompt generation and access our extensive prompt library, subscribe for just $4.99/month.`,
  },
  {
    question: `What Does the Prompt Library Offer and How Do I Access It?`,
    answer: `Our Prompt Library is a vast, ever-evolving collection of expertly designed prompt templates for various tasks and industries, aiming to optimize your interactions with various AI systems. Full access to the library is exclusive to our paid subscribers.`,
  },
  {
    question: `How Can I Cancel My Subscription?`,
    answer: `Canceling your subscription is straightforward. Simply visit your account dashboard on our website to manage your subscription settings.`,
  },
];

const FAQ = () => {
  return (
    <Stack
      id="faqs"
      sx={{
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        color: Colors.WHITE,
        position: "relative",
        padding: { lg: "0", xs: "1.69rem" },
      }}
    >
      <Typography
        sx={{
          marginTop: "13.69rem",
          marginBottom: { lg: "6.56rem", xs: "3.62rem" },
          fontSize: { lg: "4.0625rem", md: "3.75rem", xs: "2.1875rem" },
          fontWeight: "300",
          span: { fontWeight: "700", color: "#2D969B" },
          textAlign: "center",
          lineHeight: "2.8125rem",
        }}
      >
        Frequently Asked <span>Questions</span>
      </Typography>

      <Stack spacing={3} sx={{ padding: "1rem 0" }}>
        {questionsAndAnswers.map((questionsAndAnswer, index) => (
          <QuestionAnswer
            key={index}
            question={questionsAndAnswer.question}
            answer={questionsAndAnswer.answer}
          />
        ))}
      </Stack>

      {/* ******************** BACKGROUND OVERLAY ********************** */}
      <BackgroundOverlay right={0} />
    </Stack>
  );
};

export default FAQ;
