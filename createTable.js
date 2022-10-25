
export default function createTable(res) {
  let b = 
    `<table>
      <tr>
    `
  res.fields.forEach(item => {
  b+= `<th> ${item.name} </th>`
  })
  b+= `</tr>`
  res.rows.forEach(item => {
  const itval = Object.values(item);
  b+= `<tr>`
  itval.forEach(itm => {
    b+= `<td> ${itm} </td>`
  })
  b+= `</tr>`
  })
  b+= `</table>`
  return b
}

