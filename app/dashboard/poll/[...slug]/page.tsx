export default function Page({ params }: { params: { slug: string[] } }) {
  return (<div>My Post: {params.slug[0]} ----- {params.slug[1]}</div>)
}