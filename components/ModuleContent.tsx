import { Box, Typography, List, ListItem } from "@mui/material";
import ExpandableSection from "./ExpandableSection";
import KnowledgeCheck from "./KnowledgeCheck";

interface Section {
  heading: string;
  text: string | string[];
  list?: string[];
  note?: string;
  expandable?: boolean;
}

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Module {
  title: string;
  content?: {
    sections: Section[];
  };
  questions?: Question[];
}

interface ModuleContentProps {
  module: Module;
  onQuestionSuccess: (index: number) => void;
  completedQuestions: { [key: number]: boolean[] };
  guideColor: string;
  guideColorRgb: string;
  moduleIndex: number;
}

export default function ModuleContent({
  module,
  onQuestionSuccess,
  completedQuestions,
  guideColor,
  guideColorRgb,
  moduleIndex,
}: ModuleContentProps) {
  return (
    <Box>
      <Typography 
        variant="h3" 
        fontWeight={800} 
        mb={3}
        sx={{
          fontSize: { xs: 32, md: 44 },
          lineHeight: { xs: 1.3, md: 1.2 },
        }}
      >
        {module.title}
      </Typography>
      {module.content &&
        module.content.sections &&
        module.content.sections.map((section: Section, i: number) => {
          if (section.expandable) {
            return (
              <ExpandableSection
                key={i}
                title={section.heading}
                guideColor={guideColor}
                
              >
                {Array.isArray(section.text) ? (
                  section.text.map((t: string, idx: number) => (
                    <Typography variant="body1" mb={section.list ? 1 : 2} key={idx} paragraph>
                      {t}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body1" mb={section.list ? 1 : 2}>
                    {section.text}
                  </Typography>
                )}
                {section.list && (
                  <List
                    sx={{
                      pl: 3,
                      mb: 1,
                      listStyleType: "disc",
                      "& .MuiListItem-root": {
                        display: "list-item",
                        pl: 0,
                        py: 0.5,
                        "&::marker": {
                          color: "var(--foreground)",
                        },
                      },
                    }}
                  >
                    {section.list.map((item: string, j: number) => (
                      <ListItem key={j}>
                        {item}
                      </ListItem>
                    ))}
                  </List>
                )}
                {section.note && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <em>{section.note}</em>
                  </Typography>
                )}
              </ExpandableSection>
            );
          }
          return (
            <Box key={i} mb={2}>
              <Typography 
                variant="h5" 
                fontWeight={700} 
                sx={{
                  fontSize: { xs: 19, md: 24 },
                  lineHeight: { xs: 1.4, md: 1.3 },
                  marginBottom: { xs: 1, md: 1.3 },
                  marginTop: { xs: 2, md: 4.3 },
                }}
              >
                {section.heading}
              </Typography>
              {Array.isArray(section.text) ? (
                section.text.map((t: string, idx: number) => (
                  <Typography variant="body1" mb={section.list ? 1 : 3} mt={2} key={idx} paragraph>
                    {t}
                  </Typography>
                ))
              ) : (
                <Typography variant="body1" mb={section.list ? 1 : 2}>
                  {section.text}
                </Typography>
              )}
              {section.list && (
                <List
                  sx={{
                    pl: 3,
                    mb: 1,
                    listStyleType: "disc",
                    "& .MuiListItem-root": {
                      display: "list-item",
                      pl: 0,
                      py: 0.5,
                      "&::marker": {
                        color: "var(--foreground)",
                      },
                    },
                  }}
                >
                  {section.list.map((item: string, j: number) => (
                    <ListItem key={j}>
                      {item}
                    </ListItem>
                  ))}
                </List>
              )}
              {section.note && (
                <Typography variant="body2" color="text.secondary" mt={1}>
                  <em>{section.note}</em>
                </Typography>
              )}
            </Box>
          );
        })}
      {module.questions &&
        module.questions.length > 0 &&
        module.questions.map((q: Question, idx: number) => (
          <KnowledgeCheck
            key={idx}
            question={q.question}
            options={q.options}
            correctAnswer={q.correctAnswer}
            onSuccess={() => onQuestionSuccess(idx)}
            guideColor={guideColor}
            guideColorRgb={guideColorRgb}
            completedQuestions={completedQuestions}
            questionIndex={idx}
            moduleIndex={moduleIndex}
          />
        ))}
    </Box>
  );
} 