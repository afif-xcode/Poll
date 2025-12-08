import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { getSinglePoll } from "./Api";
import { API } from "./Api";

const PollCard = () => {
  const navigate = useNavigate();
  const [poll, setPoll] = useState();
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchPoll = async () => {
      try {
        const response = await getSinglePoll(id);
        setLoading(true);
        // Assuming your API returns the poll object on success
        if (response && !response.error) {
          setPoll(response.poll);
        } else {
          console.error("Poll not found or API error:", response);
          setPoll(null); // Keep poll as null to trigger NotFound
        }
      } catch (error) {
        console.error("Fetch failed:", error);
        setPoll(null);
      }
    };
    fetchPoll();
    setLoading(false);
  }, [id]);

  const handleVotes = async (i) => {
    try {
      const res = await API.post(`/poll/${id}/vote`, {
        option: i,
      });

      if (!res.data.error) {
        setPoll(res.data.poll);
      }
    } catch (err) {
      console.error("Voting failed:", err);
    }
  };

  if (!poll) {
    return <NotFound>{loading ? "Loading..." : "Poll not found"}</NotFound>;
  }

  return (
    <CardContainer>
      <Header>
        <QuestionNumber>Question #{poll._id}</QuestionNumber>
        <QuestionTitle>{poll.question}</QuestionTitle>
      </Header>

      <OptionsList>
        {[1, 2, 3, 4].map((i) => (
          <OptionRow key={i}>
            <VoteButton onClick={() => handleVotes(i)}>
              {poll[`option${i}`]}
            </VoteButton>
            <StatsContainer>
              <StatText>
                <strong>{poll[`option${i}Count`]}</strong> votes
              </StatText>
              <PercentageBadge>{poll[`option${i}Percentage`]}%</PercentageBadge>
            </StatsContainer>
          </OptionRow>
        ))}
      </OptionsList>

      <Divider />

      <ActionContainer>
        <ActionButton onClick={() => navigate(`/`)} variant="edit">
          Go Back
        </ActionButton>
        <ActionButton
          variant="edit"
          onClick={() => navigate(`/poll/edit/${poll._id}`)}
        >
          Edit Poll
        </ActionButton>
        <ActionButton
          variant="delete"
          onClick={() => navigate(`/poll/delete/${poll._id}`)}
        >
          Delete
        </ActionButton>
      </ActionContainer>
    </CardContainer>
  );
};

export default PollCard;

// --- Styled Components ---

const CardContainer = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 32px;
  max-width: 500px;
  margin: 40px auto;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const QuestionNumber = styled.h5`
  color: #888;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 8px 0;
  font-weight: 600;
`;

const QuestionTitle = styled.h3`
  color: #333;
  font-size: 1.5rem;
  margin: 0;
  line-height: 1.3;
`;

const OptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f8f9fa;
    border-color: #d0d0d0;
  }
`;

const VoteButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  color: #2c3e50;
  cursor: pointer;
  text-align: left;
  flex: 1; /* Takes up remaining space */
  padding: 0;
`;

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatText = styled.span`
  font-size: 0.9rem;
  color: #666;
`;

const PercentageBadge = styled.span`
  background-color: #e3f2fd;
  color: #1976d2;
  font-size: 0.85rem;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  min-width: 40px;
  text-align: center;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #eee;
  margin: 24px 0;
`;

const ActionContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background 0.2s;

  /* Dynamic styling based on props */
  background-color: ${(props) =>
    props.variant === "delete" ? "#ffebee" : "#f5f5f5"};
  color: ${(props) => (props.variant === "delete" ? "#d32f2f" : "#333")};

  &:hover {
    background-color: ${(props) =>
      props.variant === "delete" ? "#ffcdd2" : "#e0e0e0"};
  }
`;

const NotFound = styled.div`
  text-align: center;
  color: #d32f2f;
  font-size: 1.2rem;
  margin-top: 40px;
`;
