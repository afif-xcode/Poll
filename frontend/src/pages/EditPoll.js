import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSinglePoll, editPoll } from "../services/api";
import { Container, Card, Title } from "../components/Layouts/index";
import { StyledForm, FormGroup, Label, Input } from "../components/Form";
import { Button } from "../components/Button";
import styled from "styled-components";

const EditPoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });

  useEffect(() => {
    const fetchPoll = async () => {
      const response = await getSinglePoll(id);
      if (!response.error) {
        const { question, option1, option2, option3, option4 } = response.poll;
        setFormData({ question, option1, option2, option3, option4 });
      }
    };
    fetchPoll();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await editPoll(id, formData);
    if (!res.error) navigate(`/poll/${id}`);
  };

  return (
    <Container>
      <FormCard>
        <Header>
          <SubTitle>Poll #{id}</SubTitle>
          <Title>Edit Poll</Title>
        </Header>
        <StyledForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Poll Question</Label>
            <Input
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
            />
          </FormGroup>
          {/* Reuse logic for options */}
          {[1, 2, 3, 4].map((num) => (
            <FormGroup key={num}>
              <Label>Option {num}</Label>
              <Input
                name={`option${num}`}
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
              Save Changes
            </Button>
          </ActionRow>
        </StyledForm>
      </FormCard>
    </Container>
  );
};

export default EditPoll;

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
