import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { getSinglePoll, API } from "../services/api";
import { Container, Card, Title } from "../components/Layouts/index";
import { Button } from "../components/Button";

const PollDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getSinglePoll(id);
        if (response && !response.error) {
          setPoll(response.poll);
        }
      } catch (error) {
        console.error("Fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPoll();
  }, [id]);

  const handleVotes = async (optionIndex) => {
    try {
      const res = await API.post(`/poll/${id}/vote`, { option: optionIndex });
      if (!res.data.error) {
        setPoll(res.data.poll);
      }
    } catch (err) {
      console.error("Voting failed:", err);
    }
  };

  if (!poll) return <Container>Loading...</Container>;

  return (
    <Container>
      <CenteredCard>
        <Header>
          <QuestionMeta>Question #{poll._id}</QuestionMeta>
          <Title>{poll.question}</Title>
        </Header>

        <OptionsList>
          {[1, 2, 3, 4].map((i) => (
            <OptionRow key={i}>
              <VoteButton onClick={() => handleVotes(i)}>
                {poll[`option${i}`]}
              </VoteButton>
              <Stats>
                <strong>{poll[`option${i}Count`]}</strong> votes
                <Percentage>{poll[`option${i}Percentage`]}%</Percentage>
              </Stats>
            </OptionRow>
          ))}
        </OptionsList>

        <Divider />

        <Actions>
          <Button onClick={() => navigate("/")}>Go Back</Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/poll/edit/${poll._id}`)}
          >
            Edit Poll
          </Button>
        </Actions>
      </CenteredCard>
    </Container>
  );
};

export default PollDetails;

// --- Local Styles ---
const CenteredCard = styled(Card)`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
`;

const Header = styled.div`
  margin-bottom: 32px;
  text-align: center;
`;

const QuestionMeta = styled.h5`
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 12px;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const VoteButton = styled.button`
  background: none;
  border: none;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.secondary};
  cursor: pointer;
  text-align: left;
  flex: 1;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Percentage = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 6px;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  margin: 32px 0;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;
