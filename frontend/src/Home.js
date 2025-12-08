import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllPolls } from "./Api";

const Home = () => {
  const navigate = useNavigate();

  const [POLLS, SETPOLLS] = useState([]);

  const response = async () => {
    const { polls } = await getAllPolls();
    SETPOLLS(polls);
  };

  useEffect(() => {
    response();
  }, []);

  return (
    <MainContainer>
      <TopBar>
        <HeaderGroup>
          <Title>Poll Dashboard</Title>
          <CountBadge>{POLLS.length} Active Polls</CountBadge>
        </HeaderGroup>
        {/* Assuming you have a create route, or this is a placeholder */}
        <CreateButton onClick={() => navigate("/poll/create")}>
          + Create New Poll
        </CreateButton>
      </TopBar>

      <GridContainer>
        {POLLS.length &&
          POLLS.map((poll) => (
            <PollCard key={poll._id}>
              <CardContent>
                <PollNumber>Poll #{poll._id}</PollNumber>
                <PollQuestion>{poll.question}</PollQuestion>
              </CardContent>

              <Divider />

              <ButtonGroup>
                <LinkButton to={`/poll/${poll._id}`}>View</LinkButton>
                <IconButton
                  onClick={() => navigate(`/poll/edit/${poll._id}`)}
                  title="Edit"
                >
                  Edit
                </IconButton>
                <IconButton
                  variant="delete"
                  onClick={() => navigate(`/poll/delete/${poll._id}`)}
                  title="Delete"
                >
                  Delete
                </IconButton>
              </ButtonGroup>
            </PollCard>
          ))}
      </GridContainer>
    </MainContainer>
  );
};

export default Home;

// --- Styled Components ---

const MainContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
`;

const HeaderGroup = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
`;

const CountBadge = styled.span`
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 700;
`;

const CreateButton = styled.button`
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background-color: #1565c0;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(25, 118, 210, 0.3);
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
`;

const PollCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const CardContent = styled.div`
  padding: 24px;
  flex-grow: 1; /* Pushes buttons to the bottom */
`;

const PollNumber = styled.span`
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #888;
  font-weight: 700;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

const PollQuestion = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin: 0;
  line-height: 1.4;

  /* Truncate text after 3 lines */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #f0f0f0;
  width: 100%;
`;

const ButtonGroup = styled.div`
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  align-items: center;
  background-color: #fafafa;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

// Styled Link component for the main View action
const LinkButton = styled(Link)`
  text-decoration: none;
  background-color: white;
  border: 1px solid #d0d0d0;
  color: #333;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  flex-grow: 1;
  text-align: center;
  transition: all 0.2s;

  &:hover {
    background-color: #333;
    color: white;
    border-color: #333;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${(props) => (props.variant === "delete" ? "#d32f2f" : "#1976d2")};
  padding: 8px 12px;
  border-radius: 6px;
  transition: background 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.variant === "delete" ? "#ffebee" : "#e3f2fd"};
  }
`;
