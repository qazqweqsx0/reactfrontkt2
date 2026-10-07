import type { TypedDocumentNode } from "@apollo/client";
import { gql } from '@apollo/client';

interface Category {
    name: string;
    color: string;
}

interface Task {
    id: number;
    title: string;
    isCompleted: boolean;
    category: Category
}

interface AllTasksData {
    allTasks: Task[]
}

export const GET_TASKS: TypedDocumentNode<AllTasksData> = gql`
    query getTasks {
        allTasks {
            id
            title
            isCompleted
            category {
              name
              color
            }
        }
    }
`;