import React from "react";
import styled from "styled-components";
import Social from "./Social";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";

const StyledSocials = styled.div`
  display: flex;
  flex-direction: column;
`;

const Socials = () => {
  return (
    <StyledSocials>
      <Social
        icon={<GitHubIcon />}
        link={"https://github.com/chase-manning"}
        text={"GitHub"}
      />
      <Social
        icon={<LinkedInIcon />}
        link={"https://www.linkedin.com/in/chasemanning"}
        text={"Linked In"}
      />
      <Social
        icon={<TwitterIcon />}
        link={"https://twitter.com/ChaseManning_NZ"}
        text={"Twitter"}
      />
      <Social
        icon={<InstagramIcon />}
        link={"https://www.instagram.com/chase.manning.nz"}
        text={"Instagram"}
      />
    </StyledSocials>
  );
};

export default Socials;
