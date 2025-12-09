import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getAllPolls } from "../services/api";
import {
  Container,
  PageHeader,
  Title,
  Card,
} from "../components/Layouts/index";
import { Button, LinkButton } from "../components/Button";

const Home = () => {
  const navigate = useNavigate();
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Ensure we handle the API response correctly (checking for errors or empty states)
      try {
        const response = await getAllPolls();
        if (response && response.polls) {
          setPolls(response.polls);
        }
      } catch (error) {
        console.error("Failed to fetch polls:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      <PageHeader>
        <HeaderGroup>
          <Title>Poll Dashboard</Title>
          <CountBadge>{polls.length} Active Polls</CountBadge>
        </HeaderGroup>
        <Button variant="primary" onClick={() => navigate("/poll/create")}>
          + Create New Poll
        </Button>
      </PageHeader>

      <Grid>
        {polls.length > 0 &&
          polls.map((poll) => (
            // We use the custom PollCard (styled below) instead of the generic Card
            <PollCard key={poll._id} hover>
              <CardContent>
                <PollNumber>Poll #{poll._id}</PollNumber>
                <PollQuestion>{poll.question}</PollQuestion>
              </CardContent>

              <Divider />

              <ButtonGroup>
                <LinkButton to={`/poll/${poll._id}`} style={{ flex: 1 }}>
                  View
                </LinkButton>
                <Button onClick={() => navigate(`/poll/edit/${poll._id}`)}>
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => navigate(`/poll/delete/${poll._id}`)}
                >
                  Delete
                </Button>
              </ButtonGroup>
            </PollCard>
          ))}
      </Grid>
    </Container>
  );
};

export default Home;

// --- Local Styles for Home ---

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

// Extends the generic Card but overrides styles for this specific layout
const PollCard = styled(Card)`
  padding: 0; /* Remove default padding so the footer touches edges */
  display: flex;
  flex-direction: column;
  height: 100%; /* Ensures all cards in the row are the same height */
`;

const HeaderGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
`;

const CountBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.primary};
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
`;

const CardContent = styled.div`
  padding: 24px;
  flex-grow: 1; /* This pushes the Divider and ButtonGroup to the bottom */
`;

const PollNumber = styled.span`
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.muted};
  font-weight: 700;
  margin-bottom: 8px;
`;

const PollQuestion = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.4;

  /* Truncate text nicely after 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  width: 100%;
`;

const ButtonGroup = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
  border-bottom-left-radius: ${({ theme }) => theme.borderRadius.medium};
  border-bottom-right-radius: ${({ theme }) => theme.borderRadius.medium};
`;
