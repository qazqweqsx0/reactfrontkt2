import { gql, type TypedDocumentNode } from '@apollo/client';
import { useMutation } from '@apollo/client/react';

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

const CREATE_TASK: TypedDocumentNode<CreateTaskData, CreateTaskVariables> = gql`
    mutation CreateTask {
        createTask(input: {title: "", description: ""}) {
            title
            description
        }
    }
`;

function TaskForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createTask] = useMutation(CREATE_TASK);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask({
        variables: { title, description }
      });
      
      setTitle('');
    } catch (err) {
      console.error("Ошибка при выполнении мутации:", err);
    }
    }

    return (
        <form>
            <input type="text" placeholder="Название задачи" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input type="text" placeholder="Описание" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <button>Добавить задачу</button>
        </form>
    )
}

export default TaskForm
