// src/components/GitHubProfileCard.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// Styled Components
const ProfileCard = styled.div`
  width: 100%;
  max-width: 500px;
  background: ${({ theme }) => theme.card};
  border: 0.1px solid #854CE6;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
  border-radius: 16px;
  padding: 18px 36px;
  text-align: center;
  margin: 20px auto;

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 10px 36px;
  }

  @media (max-width: 500px) {
    max-width: 330px;
    padding: 10px 36px;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 15px;
`;

const Name = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 10px;
`;

const Username = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 15px;
`;

const Bio = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 20px;
`;

const Stats = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const RepoIcon = styled.svg`
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.text_primary};
`;

const ProfileLink = styled.a`
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
  text-decoration: none;
  border: 1px solid ${({ theme }) => theme.text_primary};
  padding: 8px 16px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.card};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.text_primary};
    color: ${({ theme }) => theme.card};
  }
`;

// GitHubProfileCard Component
const GitHubProfileCard = ({ username }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            setProfile(data);
        };

        fetchProfile();
    }, [username]);

    if (!profile) return <p>Loading...</p>;

    return (
        <ProfileCard>
            <Avatar src={profile.avatar_url} alt={`${profile.login}'s avatar`} />
            <Name>{profile.name}</Name>
            <Username>@{profile.login}</Username>
            <Stats>
                <RepoIcon aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-repo UnderlineNav-octicon">
                    <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"></path>
                </RepoIcon>
                {profile.public_repos}
            </Stats>
            <ProfileLink href={profile.html_url} target="_blank" rel="noopener noreferrer">
                View GitHub Profile
            </ProfileLink>
            <br /><br />
        </ProfileCard>
    );
};

export default GitHubProfileCard;
