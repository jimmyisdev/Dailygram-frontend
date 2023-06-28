import { Button, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TextRotateVerticalIcon from "@mui/icons-material/TextRotateVertical";
export default function TextFormatter() {
  const [openTool, setOpenTool] = useState(false);
  const [oneLine, setOneLine] = useState(
    "這是一個讓\n留言用詞 \n不會再受到審查\n的小工具"
  );
  const [filler, setFiller] = useState("👍");
  const [porcessedText, setProcessedText] = useState([]);
  function reset() {
    setOneLine("");
    setFiller("");
    setProcessedText([]);
  }

  function processText() {
    if (oneLine.length === 0) return;
    let splitedTextArr = oneLine.split("\n").map((item) => item.trim());
    let longestSentence = splitedTextArr.reduce(
      (maxLength, currentString) =>
        currentString.length > maxLength ? currentString.length : maxLength,
      0
    );
    let newStruct = Array(longestSentence).fill("");
    for (let i = splitedTextArr.length - 1; i >= 0; i--) {
      for (let j = 0; j < longestSentence; j++) {
        let char = Array.from(splitedTextArr[i])[j];
        let val = char !== undefined ? char : "　";
        newStruct[j] += val;
        if (!!filler && i !== 0) newStruct[j] += filler;
      }
    }
    return setProcessedText(newStruct);
  }
  async function copy() {
    if (porcessedText.length === 0) {
      return;
    }
    let copiedText = porcessedText.reduce(
      (accumulator, currentValue) => `${accumulator} \n` + currentValue,
      ""
    );
    console.log(copiedText);
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(copiedText);
    } else {
      document.execCommand("copy", true, copiedText);
    }
  }

  useEffect(() => {
    processText();
  }, []);

  return (
    <Stack
      sx={{
        margin: "5px",
      }}
    >
      <Button onClick={() => setOpenTool(!openTool)}>
        <Typography>Text Formatter</Typography>
      </Button>
      {openTool && (
        <Stack>
          <textarea
            rows="10"
            cols="30"
            onChange={(e) => setOneLine(e.target.value)}
            placeholder="Input text..."
            value={oneLine}
          />
          <Stack>
            {porcessedText.map((item) => {
              return <Typography key={item}>{item}</Typography>;
            })}
          </Stack>
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <TextField
              sx={{
                width: "3rem",
                height: "3rem",
              }}
              onChange={(e) => setFiller(e.target.value)}
              value={filler}
            />
            <Tooltip title="Convert text from horizontal to vertical" arrow>
              <Button
                disabled={!!oneLine.length ? false : true}
                onClick={processText}
              >
                <TextRotateVerticalIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Clear the text input field" arrow>
              <Button onClick={reset}>
                <CleaningServicesIcon />
              </Button>
            </Tooltip>
            <Tooltip title="Copy the formatted text" arrow>
              <Button onClick={copy}>
                <ContentCopyIcon />
              </Button>
            </Tooltip>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
}
