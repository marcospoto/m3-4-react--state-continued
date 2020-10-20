import React from "react";
import styled from "styled-components";

const Typehead = (props) => {
  const { handleSelect, suggestions } = props;
  const [value, setValue] = React.useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );

  console.log("suggestions", suggestions);

  const matches = suggestions.filter((suggestion) => {
    const lowerCaseTitle = suggestion.title.toLowerCase();
    const lowerCaseValue = value.toLowerCase();
    const isIncluded = lowerCaseTitle.includes(lowerCaseValue);
    const hasMoreThanTwoChars = value.length >= 2;
    return isIncluded && hasMoreThanTwoChars;
  });

  console.log("matches", matches);
  console.log("value", value);

  return (
    <Wrapper>
      <Row>
        <Input
          type="text"
          value={value}
          onChange={(ev) => setValue(ev.target.value)}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter":
                handleSelect(ev.target.value);
                break;
              case "ArrowUp": {
                setSelectedSuggestionIndex(selectedSuggestionIndex - 1);
                break;
              }
              case "ArrowDown": {
                setSelectedSuggestionIndex(selectedSuggestionIndex + 1);
                break;
              }
            }
          }}
        />
        <ClearButton onClick={() => setValue("")}>Clear</ClearButton>
      </Row>

      {matches.length > 0 && (
        <Suggestions>
          {matches.map((match, matchIndex) => {
            const startPosition = match.title
              .toLowerCase()
              .indexOf(value.toLowerCase());
            const endPosition = startPosition + value.length;
            const firstHalf = match.title.slice(0, endPosition);
            const lastHalf = match.title.slice(endPosition);

            const isSelected = matchIndex === selectedSuggestionIndex;

            return (
              <Suggestion
                isSelected={isSelected}
                key={match.id}
                onClick={() => {
                  handleSelect(match.title);
                }}
              >
                <span>{firstHalf}</span>
                <span style={{ fontWeight: "bold" }}>{lastHalf}</span>
              </Suggestion>
            );
          })}
        </Suggestions>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 15px;
  margin-left: 15px;
`;
const Input = styled.input`
  border: 1px solid #e3e3e3;
  padding: 8px;
  width: 350px;
`;
const ClearButton = styled.button`
  background-color: blue;
  border: none;
  color: white;
  border-radius: 3px;
  padding: 10px;
  margin-left: 3px;
`;

const Row = styled.div`
   ;
`;

const Suggestions = styled.ul`
  box-shadow: 10px 10px 5px 0px rgba(204, 198, 204, 0.67);
  border-radius: 5px;
  padding: 10px;
  width: 405px;
`;

const Suggestion = styled.li`
  padding: 8px;
  background-color: ${(props) => (props.isSelected ? "#fffbe6" : "white")};

  &:hover {
    background-color: #fffbe6;
  }
`;

export default Typehead;
