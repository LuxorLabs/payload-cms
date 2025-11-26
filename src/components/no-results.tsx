import { NoResultsIcon } from '@/assets/svg/no-results-icon.svg'

type NoResultsProps = {
  text?: string
}
export const NoResults = ({ text = 'No Results' }: NoResultsProps) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-3 py-[100px]">
      <NoResultsIcon />
      <span className="text-lg">{text}</span>
    </div>
  )
}
