import { useState } from "react"; // useEffect is no longer needed
import { useNavigate } from "react-router-dom";
import * as S from "./PollStyles";
import { createPoll } from "./Api";

const PollCreateForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 1. Make the handler function async
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const newPoll = {
      question: formData.question,
      option1: formData.option1,
      option2: formData.option2,
      option3: formData.option3,
      option4: formData.option4,
    };

    try {
      // 2. Await the API call directly inside the submit handler
      const response = await createPoll(newPoll);
      const createdPoll = response.poll; // Access the nested 'poll' object from the API response

      console.log("NEW POLL CREATED:", createdPoll);
      // 3. Navigate only AFTER the API call succeeds
      navigate(`/poll/${createdPoll._id}`);
    } catch (error) {
      console.error("Error creating poll:", error);
      // Optional: Add user feedback here (e.g., set an error state)
    }
  };

  // ... (rest of the component JSX remains the same)
  return (
    <S.CardContainer>
      <S.Header>
        <S.QuestionNumber>New Poll</S.QuestionNumber>
        <S.QuestionTitle>Create Poll</S.QuestionTitle>
      </S.Header>

      <S.StyledForm onSubmit={handleFormSubmit}>
        <S.FormGroup>
          <S.Label>Poll Question</S.Label>
          <S.StyledInput
            type="text"
            name="question"
            placeholder="Enter poll question"
            value={formData.question}
            onChange={handleChange}
            required
          />
        </S.FormGroup>

        <S.Divider />

        {[1, 2, 3, 4].map((num) => (
          <S.FormGroup key={num}>
            <S.Label>Option {num}</S.Label>
            <S.StyledInput
              type="text"
              name={`option${num}`}
              placeholder={`Enter option ${num}`}
              value={formData[`option${num}`]}
              onChange={handleChange}
              required
            />
          </S.FormGroup>
        ))}

        <S.Divider />

        <S.ActionContainer>
          <S.ActionButton type="button" onClick={() => navigate(-1)}>
            Cancel
          </S.ActionButton>
          <S.ActionButton type="submit" variant="save">
            Create Poll
          </S.ActionButton>
        </S.ActionContainer>
      </S.StyledForm>
    </S.CardContainer>
  );
};

export default PollCreateForm;
