import { gql, type TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

interface Category {
    name: string;
    color: string;
}

interface Task {
    title: string;
    isCompleted: boolean;
    category: Category
}

interface AllTasksData {
    allTasks: Task[]
}

const GET_TASKS: TypedDocumentNode<AllTasksData> = gql`
    query getTasks {
        allTasks {
            title
            isCompleted
            category {
              name
              color
            }
        }
    }
`;

function TaskList() {
    const { loading, error, data } = useQuery(GET_TASKS);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error.message}</p>;

    return (
        <div>
            <p>Задачи</p>
            {data?.allTasks.map(item => <div>
                <p>{item.title}</p>
                <p style={{color: item.category.color}}>{item.category.name}</p>
                <p style={{color: item.isCompleted ? "green" : "red"}}>{item.isCompleted ? "Выполнено" : "Не выполнено"}</p>
            </div>)}
        </div>
    )
}

export default TaskList