import { debounce } from '@tanstack/react-pacer';
import axios from 'axios';
import { type ComponentProps, useMemo, useState } from 'react';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox';
import { Label } from '@/components/ui/label';

type Artist = {
  id: string;
  name: string;
};

type ArtistSearchResponse = {
  artists: Artist[];
};

type Props = {
  label: string;
} & ComponentProps<'input'>;

export function ArtistSuggestInput({ label, ...props }: Props) {
  const [artistList, setArtistList] = useState<ArtistSearchResponse['artists']>(
    [],
  );
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const artists = useMemo(() => {
    if (
      !selectedArtist ||
      artistList.some((artist) => artist.id === selectedArtist.id)
    ) {
      return artistList;
    }

    return [selectedArtist, ...artistList];
  }, [artistList, selectedArtist]);

  const debouncedArtistSearch = debounce(
    async (searchTerm: string) => {
      const response = await axios.get<ArtistSearchResponse>(
        `https://musicbrainz.org/ws/2/artist?query=${searchTerm}&fmt=json&limit=10`,
      );
      setArtistList(response.data.artists);
    },
    { wait: 500 },
  );

  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label className="justify-end font-bold" htmlFor="artist">
        {label}
      </Label>
      <Combobox
        items={artists}
        itemToStringValue={(artist: Artist) => artist.name}
        onInputValueChange={(nextSearchValue: string) => {
          if (nextSearchValue === '') {
            setArtistList([]);
            return;
          }

          return debouncedArtistSearch(nextSearchValue);
        }}
        onOpenChangeComplete={(open) => {
          if (!open && selectedArtist) {
            setArtistList([selectedArtist]);
          }
        }}
        onValueChange={(nextSelectedValue: Artist | null) => {
          setSelectedArtist(nextSelectedValue);
        }}
      >
        <ComboboxInput
          className="col-span-3"
          placeholder={label}
          showClear
          {...props}
        />
        <ComboboxContent>
          <ComboboxEmpty>Nothing to be seen.</ComboboxEmpty>
          <ComboboxList className="z-[9999]">
            {(artist: Artist) => (
              <ComboboxItem key={artist.id} value={artist.name}>
                {artist.name}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
