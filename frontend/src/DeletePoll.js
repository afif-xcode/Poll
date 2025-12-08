import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { deletePoll } from "./Api";

const DeletePoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      // 1. Await the asynchronous API call
      const response = await deletePoll(id);

      // Assuming a successful response does not contain an 'error' object/property
      if (response && !response.error) {
        console.log(`Poll with ID ${id} deleted successfully.`);

        // 2. SUCCESS: Navigate the user away, usually to the home page or poll list
        navigate("/");
      } else {
        // 3. ERROR: Handle server-side errors (e.g., poll not found)
        console.error("Failed to delete poll:", response);
        alert("Deletion failed: " + (response.message || "Unknown error."));

        // Optional: Navigate back or stay on the page
        navigate(-1);
      }
    } catch (error) {
      // 4. ERROR: Handle network/client-side errors
      console.error("Network or client error during deletion:", error);
      alert("A network error occurred. Please try again.");
      navigate(-1);
    }
  };

  return (
    <PageWrapper>
      <DeleteCard>
        <AlertIcon>!</AlertIcon>
        <Title>Proceed to Delete?</Title>
        <SubText>
          Are you sure you want to delete **Poll ID: {id}**? This action cannot
          be undone.
        </SubText>
        <ButtonGroup>
          <CancelButton onClick={() => navigate(-1)}>No, Keep it</CancelButton>
          <DeleteButton onClick={handleConfirm}>Yes, Delete</DeleteButton>
        </ButtonGroup>
      </DeleteCard>
    </PageWrapper>
  );
};

export default DeletePoll;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 100px;
  min-height: 80vh;
`;

const DeleteCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 40px 32px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  border-top: 5px solid #d32f2f;
`;

const AlertIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #ffebee;
  color: #d32f2f;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 20px auto;
`;

const Title = styled.h3`
  color: #333;
  font-size: 1.4rem;
  margin: 0 0 12px 0;
  font-weight: 700;
`;

const SubText = styled.p`
  color: #666;
  font-size: 0.95rem;
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
`;

const BaseButton = styled.button`
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  flex: 1;

  &:active {
    transform: scale(0.98);
  }
`;

const DeleteButton = styled(BaseButton)`
  background-color: #d32f2f;
  color: white;

  &:hover {
    background-color: #b71c1c;
    box-shadow: 0 4px 12px rgba(211, 47, 47, 0.3);
  }
`;

const CancelButton = styled(BaseButton)`
  background-color: #f5f5f5;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;
