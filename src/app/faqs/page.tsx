import { FaPlus } from "react-icons/fa6";
import { Question, QuestionRow } from "./_components/QuestionRow";

const FAQsPage = () => {
  return (
    <div className="min-h-screen ">
      {/* content container */}
      <div className="w-full flex flex-col my-20 px-4">
        {/* heading part */}
        <div className="flex flex-row justify-center items-center ">
          {/* sparky image */}
          <img
            src="/sites/faqs/SittingSparky.png"
            alt="sparky "
            className="w-50 aspect-auto"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-8xl sm:text-9xl font-bold text-slate-800">
              FAQs
            </h1>
            <p className="ml-12 text-slate-600">Frequently Asked Questions</p>
          </div>
        </div>

        {/* question rows */}
        <div className="flex flex-col gap-8">
          {QUESTIONS.map((question, index) => (
            <QuestionRow key={index} question={question}></QuestionRow>
          ))}
        </div>
      </div>
    </div>
  );
};

const QUESTIONS: Question[] = [
  {
    question: "What is the GDG PUP Digital ID Platform?",
    answer: "Enter your registered email address in the lookup field. If your email isin the database, your digital ID will be generated instantly.",
  },
  {
    question: "How do I get my digital ID?",
    answer: "Enter your registered email address in the lookup field. If you email is in the database, your digital ID will be generated instantly.",
  },
  {
    question: "What information appears on the Digital ID?",
    answer: "Your name, GDG ID number, college & program, and a QR code linked to your member record.",
  },
  {
    question: "Question 4",
    answer: "Answer 4",
  },
  {
    question: "Question 5",
    answer: "Answer 5",
  },
];

export default FAQsPage;
