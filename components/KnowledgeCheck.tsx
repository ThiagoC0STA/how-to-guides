import { useState, useEffect } from 'react';
import { Box, Typography, Radio, RadioGroup, FormControlLabel, Button, Alert, Paper } from '@mui/material';

interface KnowledgeCheckProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onSuccess?: () => void;
  guideColor?: string;
  guideColorRgb?: string;
  completedQuestions?: { [key: number]: boolean[] };
  questionIndex?: number;
  moduleIndex?: number;
}

export default function KnowledgeCheck({ 
  question, 
  options, 
  correctAnswer, 
  onSuccess, 
  guideColor = '#2563eb', 
  guideColorRgb = '37,99,235',
  completedQuestions = {},
  questionIndex = 0,
  moduleIndex = 0
}: KnowledgeCheckProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    const moduleQuestions = completedQuestions[moduleIndex] || [];
    if (moduleQuestions[questionIndex]) {
      setSubmitted(true);
      setIsCorrect(true);
      setSelected(correctAnswer);
    } else {
      setSelected(null);
      setSubmitted(false);
      setIsCorrect(false);
    }
  }, [questionIndex, moduleIndex, completedQuestions, correctAnswer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selected === correctAnswer) {
      setIsCorrect(true);
      if (onSuccess) onSuccess();
    } else {
      setIsCorrect(false);
    }
    setSubmitted(true);
  };

  const handleTryAgain = () => {
    const moduleQuestions = completedQuestions[moduleIndex] || [];
    if (!moduleQuestions[questionIndex]) {
      setSubmitted(false);
      setIsCorrect(false);
      setSelected(null);
    }
  };

  return (
    <Paper variant="outlined" sx={{ p: 3, mb: 3, bgcolor: 'grey.50', borderRadius: 2 }}>
      <Typography fontWeight={700} mb={1.5}>Knowledge Check</Typography>
      <Typography mb={2}>{question}</Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <RadioGroup
          value={selected !== null ? selected : ''}
          onChange={(_, value) => setSelected(Number(value))}
        >
          {options.map((opt, idx) => (
            <FormControlLabel
              key={idx}
              value={idx}
              control={<Radio sx={{ color: guideColor, '&.Mui-checked': { color: guideColor } }} />}
              label={opt}
              disabled={submitted}
              sx={{ mb: 1 }}
            />
          ))}
        </RadioGroup>
        {!submitted && (
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              fontWeight: 700,
              fontSize: 16,
              borderRadius: 2,
              px: 4,
              py: 1,
              textTransform: 'none',
              boxShadow: `0 2px 8px 0 rgba(${guideColorRgb}, 0.10)`,
              transition: 'all 0.18s cubic-bezier(.4,0,.2,1)',
              bgcolor: `rgba(${guideColorRgb}, 1)`,
              color: '#fff',
              '&:hover': {
                bgcolor: `rgba(${guideColorRgb}, 0.85)`,
                boxShadow: `0 4px 16px 0 rgba(${guideColorRgb}, 0.18)`,
                transform: 'scale(1.04)',
              },
            }}
            disabled={selected === null}
          >
            Submit
          </Button>
        )}
        {submitted && !isCorrect && !(completedQuestions[moduleIndex] || [])[questionIndex] && (
          <Box mt={2}>
            <Alert severity="error" sx={{ mb: 2 }}>
              Incorrect. Try again!
            </Alert>
            <Button
              variant="outlined"
              onClick={handleTryAgain}
              sx={{
                fontWeight: 700,
                fontSize: 16,
                borderRadius: 2,
                px: 4,
                py: 1,
                textTransform: 'none',
                borderColor: guideColor,
                color: guideColor,
                '&:hover': {
                  borderColor: guideColor,
                  color: guideColor,
                  background: `rgba(${guideColorRgb}, 0.06)`
                },
              }}
            >
              Try Again
            </Button>
          </Box>
        )}
        {submitted && isCorrect && (
          <Alert severity="success" sx={{ mt: 2 }}>
            Correct! You may proceed.
          </Alert>
        )}
      </Box>
    </Paper>
  );
} 