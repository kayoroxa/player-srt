async function handleSearch({ query, exactly }) {
  index = -1
  myQuery = query.toLowerCase()

  const sub = await obs('subtitle').notify('getData')
  const subtitlesDataEn = sub?.subtitlesDataEn

  if (!subtitlesDataEn) return
  const find = subtitlesDataEn.filter(sub => {
    const regex = new RegExp(`\\b(${query})\\b`, 'i')

    if (exactly && sub.text.match(regex)) return true
    else if (!exactly && sub.text.includes(query)) return true
  })

  sentencesFind = find.length > 0 ? find : false

  obs('subtitle').notify('highLight', { match: query })

  obs('warning').notify('show', {
    title: `Search for ${query}`,
    message: `Find: ${sentencesFind?.length > 0 ? sentencesFind.length : 0}`,
  })
}
