
function validateLineup(lineup) {
  return validatePlayerByTeam(lineup) &&
    validatePlayerByGame(lineup) &&
    validatePlayerPosition(lineup) &&
    validateMinimumLineup(lineup) &&
    validateSalaryTotal(lineup)
}




function validatePlayerByTeam(lineup) {
  return groupBy(lineup, member => member.teamId)
    .filter((teamGroup) => teamGroup.values.length >= 3)
    .length === 0
}

function validatePlayerByGame(lineup) {
  return groupBy(lineup, member => member.gameId)
    .filter((teamGame) => teamGame.values.length >= 4)
    .length === 0
}

function validatePlayerPosition(lineup) {
  const playerPositions = groupBy(lineup, member => member.position)

  for (let i = 0; i < playerPositions.length; i++) {
    let playerCountNeeded = null

    switch (playerPositions[i].key) {
      case 'P':
      case 'C':
      case '1B':
      case '2B':
      case '3B':
      case 'SS':
        playerCountNeeded = 1
        break

      case 'OF':
        playerCountNeeded = 3
        break
    }
    if (playerCountNeeded !== playerPositions[i].values.length) {
      return false
    }
  }

  return true
}

function validateMinimumLineup(lineup) {
  const fullRoster = ['P', 'C', '1B', '2B', '3B', 'SS', 'OF']

  for (let i = 0; i < fullRoster.length; i++) {
    const findPosition = lineup.find((player) => player.position === fullRoster[i])

    if (!findPosition) {
      return false
    }
  }

  return true
}



function validateSalaryTotal(lineup) {
  const totalSalary = lineup
    .map((player) => player.salary)
    .reduce((total, salary) => total + salary, 0)

  if (totalSalary > 45000) {
    return false
  }

  return true
}

function groupBy(arr, keySelector) {
  return arr.reduce((acc, current) => {
    const key = keySelector(current)
    let thing = acc.find((group) => group.key === key)

    if (!thing) {
      thing = {
        key: key,
        values: []
      }
      acc.push(thing)
    }
    thing.values.push(current)

    return acc
  }, [])
}

module.exports = validateLineup



