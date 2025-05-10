export const addUserTeams = ({newItem,teams}) => {
  const {_id,...rest} = newItem;
  return [
    ...teams,
    {id:_id,...rest}
  ]
}

export const removeUserTeams = ({id,teams}) => {
  return teams.filter((item) => item?.id !== id)
}