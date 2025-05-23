import { withStyles } from '@mui/styles'
import { FaTrashCan } from "react-icons/fa6";
import { BoxContent, Root, styled } from './styles/DraggableColorBoxStyles'

const DraggableColorBox = (props) => {
  const {handleDelete, name, color} = props
  return (
    <Root sx={{backgroundColor:color}}>
      <BoxContent color={color}>
        <span>{name}</span>
        <FaTrashCan onClick={handleDelete} style={{transition: 'all 0.3s ease-in-out'}}/>
      </BoxContent>
    </Root>
  )
}

export default withStyles(styled)(DraggableColorBox);