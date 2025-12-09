import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPoll } from "../services/api";
import { Container, Card, Title } from "../components/Layouts/index";
import { StyledForm, FormGroup, Label, Input } from "../components/Form";
import { Button } from "../components/Button";
import styled from "styled-components";

const CreatePoll = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createPoll(formData);
      navigate(`/poll/${response.poll._id}`);
    } catch (error) {
      console.error("Error creating poll", error);
    }
  };

  return (
    <Container>
      <FormCard>
        <Header>
          <SubTitle>New Poll</SubTitle>
          <Title>Create Poll</Title>
        </Header>

        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Poll Question</Label>
            <Input
              name="question"
              placeholder="What would you like to ask?"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <Divider />

          {[1, 2, 3, 4].map((num) => (
            <FormGroup key={num}>
              <Label>Option {num}</Label>
              <Input
                name={`option${num}`}
                placeholder={`Option ${num}`}
                value={formData[`option${num}`]}
                onChange={handleChange}
                required
              />
            </FormGroup>
          ))}

          <Divider />

          <ActionRow>
            <Button type="button" onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Create Poll
            </Button>
          </ActionRow>
        </StyledForm>
      </FormCard>
    </Container>
  );
};

export default CreatePoll;

// Local Styles
const FormCard = styled(Card)`
  max-width: 500px;
  margin: 0 auto;
  padding: 40px;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const SubTitle = styled.h5`
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 8px 0;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 20px 0;
`;

const ActionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
