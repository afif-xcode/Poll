import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { deletePoll } from "../services/api";
import { Card } from "../components/Layouts/index";
import { Button } from "../components/Button";

const DeletePoll = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    try {
      const response = await deletePoll(id);
      if (response && !response.error) {
        navigate("/");
      } else {
        alert("Deletion failed.");
      }
    } catch (error) {
      alert("A network error occurred.");
    }
  };

  return (
    <PageWrapper>
      <DeleteCard>
        <AlertIcon>!</AlertIcon>
        <Title>Delete Poll?</Title>
        <SubText>
          Are you sure you want to delete <strong>Poll #{id}</strong>? This
          action cannot be undone.
        </SubText>
        <ButtonGroup>
          <Button onClick={() => navigate(-1)} style={{ flex: 1 }}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirm} style={{ flex: 1 }}>
            Yes, Delete
          </Button>
        </ButtonGroup>
      </DeleteCard>
    </PageWrapper>
  );
};

export default DeletePoll;

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  min-height: 80vh;
`;

const DeleteCard = styled(Card)`
  max-width: 400px;
  width: 100%;
  text-align: center;
  border-top: 5px solid ${({ theme }) => theme.colors.danger};
`;

const AlertIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.danger};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 20px auto;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 12px 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const SubText = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0 0 32px 0;
  line-height: 1.5;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
`;
