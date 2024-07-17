import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchUserData = async (username) => {
  const { data } = await axios.get(`https://api.github.com/users/${username}`);
  return data;
};

const UserInformation = ({ username }) => {
  const { isLoading, error, data } = useQuery(['userData', username], () =>
    fetchUserData(username),
  );

  if (isLoading) return 'Loading...';
  if (error) {
    if (error.response && error.response.status === 404) {
      return 'User not found';
    }
    return 'An error occurred: ' + error.message;
  }

  return (
    <div>
      <h2>{data.name || 'No Name Provided'}</h2>
      <p>Username: {data.login}</p>
      <p>Bio: {data.bio || 'No Bio Provided'}</p>
      <p>Company: {data.company || 'No Company Provided'}</p>
      <p>Blog: {data.blog ? <a href={data.blog}>{data.blog}</a> : 'No Blog Provided'}</p>
      <p>Email: {data.email || 'No Email Provided'}</p> 
      <p>Location: {data.location || 'No Location Provided'}</p>
      <p>Followers: {data.followers}</p>
      <p>Following: {data.following}</p>
      <p>Public Repos: {data.public_repos}</p>
      <p>Public Gists: {data.public_gists}</p>
      <p>Account Created: {new Date(data.created_at).toLocaleDateString()}</p>
      <p>Last Updated: {new Date(data.updated_at).toLocaleDateString()}</p>
      <img src={data.avatar_url} alt={`${data.login} avatar`} width="100" />
    </div>
  );
};

export default UserInformation;
