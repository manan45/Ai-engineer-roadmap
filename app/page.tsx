import { Dashboard } from './Dashboard';
import {
  tracks,
  weeks,
  papers,
  universityCourses,
  youtubeCategories,
  stayingCurrent,
  allLinks,
} from '@/data/curriculum';
import { snapshot } from '@/lib/linkCache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Page() {
  const initialStatus = await snapshot();
  const all = allLinks();
  return (
    <Dashboard
      tracks={tracks}
      weeks={weeks}
      papers={papers}
      universities={universityCourses}
      youtubeCategories={youtubeCategories}
      stayingCurrent={stayingCurrent}
      initialStatus={initialStatus}
      allUrls={all.map((l) => l.url)}
    />
  );
}
