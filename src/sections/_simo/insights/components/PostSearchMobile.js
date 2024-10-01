import PropTypes from 'prop-types';
import parse from  'autosuggest-highlight/parse'
import match from 'autosuggest-highlight/match';

// @mui
import { Link, Avatar, Typography, TextField, InputAdornment, } from '@mui/material';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
// hooks
// import useResponsive from 'src/hooks/useResponsive';
import { useRouter } from 'next/router';
// components
import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export default function PostSearchMobile({ query, results, onSearch, hrefItem, loading }) 
{

  const router = useRouter();

  const handleClick = (title) => {
    router.push(hrefItem(title));
  };

  const handleKeyUp = (event) => {
    if (query) {
      if (event.key === 'Enter') {
        handleClick(query);
      }
    }
  };

  return (
    <Autocomplete
      sx={{ width: { xs: 1, sm: 260 } }}
      loading={loading}
      autoHighlight
      popupIcon={null}
      options={results}
      onInputChange={(event, newValue) => onSearch(newValue)}
      getOptionLabel={(option) => option.title}
      noOptionsText={<SearchNotFound query={query} sx={{ bgcolor: 'unset' }} />}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      slotProps={{
        popper: {
          placement: 'bottom-start',
          sx: {
            minWidth: 320,
          },
        },
        paper: {
          sx: {
            [` .${autocompleteClasses.option}`]: {
              pl: 0.75,
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search..."
          onKeyUp={handleKeyUp}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ ml: 1, color: 'text.disabled' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <>
                {loading ? <Iconify icon="svg-spinners:8-dots-rotate" sx={{ mr: -3 }} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, research, { inputValue }) => {
        const matches = match(research.title, inputValue);
        const parts = parse(research.title, matches);

        return (
          <li {...props} key={research.id}>
            <Avatar
              key={research.id}
              alt={research.title}
              src={research.coverUrl}
              variant="rounded"
              sx={{
                width: 48,
                height: 48,
                flexShrink: 0,
                mr: 1.5,
                borderRadius: 1,
              }}
            />

            <Link key={inputValue} underline="none" onClick={() => handleClick(research.title)}>
              {parts.map((part, index) => (
                <Typography
                  key={index}
                  component="span"
                  color={part.highlight ? 'primary' : 'textPrimary'}
                  sx={{
                    typography: 'body2',
                    fontWeight: part.highlight ? 'fontWeightSemiBold' : 'fontWeightMedium',
                  }}
                >
                  {part.text}
                </Typography>
              ))}
            </Link>
          </li>
        );
      }}
    />
  );
}

PostSearchMobile.propTypes = {
  hrefItem: PropTypes.func,
  loading: PropTypes.bool,
  onSearch: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.array,
};
