export default function Page({ params }: { params: { pollId: string } }) {
  return <div>My Post: {params.pollId}</div>
}