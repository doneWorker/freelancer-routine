import { Clickable } from 'types/common'
import { Task } from 'models/Task'

type Props = Task & Clickable

const TaskCard: React.FC<Props> = ({ name }) => {
  return <>{name}</>
}

export default TaskCard
