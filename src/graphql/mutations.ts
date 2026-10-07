import type { TypedDocumentNode } from "@apollo/client";
import { gql } from '@apollo/client';

interface Task {
    title: string;
    description: string;
}

interface CreateTaskData {
    createTask: Task;
}

interface CreateTaskVariables {
    title: string;
    description: string;
}

export const CREATE_TASK: TypedDocumentNode<CreateTaskData, CreateTaskVariables> = gql`
    mutation CreateTask($title: String!, $description: String!) {
        createTask(input: { title: $title, description: $description }) {
            title
            description
        }
    }
`;

export const COMPLETE_TASK = gql`
    mutation CompleteTask($id: ID!) {
        completeTask(id: $id) {
            id
            isCompleted
        }
    }
`;