/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import ProjectCard from './Project.card'

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'YourComponent',
  component: ProjectCard,
} as ComponentMeta<typeof ProjectCard>

const params = {
  id: '1',
  name: "Project's name",
  isCompleted: true,
  dateCreated: Date(),
  dateUpdated: Date(),
}
// 👇 We create a “template” of how args map to rendering
const Template: ComponentStory<typeof ProjectCard> = (args) => (
  <ProjectCard {...args} {...params} />
)

export const FirstStory = Template.bind({})

FirstStory.args = {
  /* 👇 The args you need here will depend on your component */
}
