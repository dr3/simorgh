import React, { useContext } from 'react';
import { number, string, bool, func } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp';
import {
  isValidDateTime,
  formatUnixTimestamp,
  showRelativeTime,
} from './timestampUtilities';
import { ServiceContext } from '../../contexts/ServiceContext';

const TimestampContainer = ({
  timestamp,
  dateTimeFormat,
  format,
  isRelative,
  prefix,
  suffix,
  timezone,
  padding,
  typographyFunc,
}) => {
  const { script } = useContext(ServiceContext);
  if (!isValidDateTime(new Date(timestamp))) {
    return null;
  }

  return (
    <Timestamp
      datetime={formatUnixTimestamp(timestamp, dateTimeFormat, timezone)}
      script={script}
      padding={padding}
      typographyFunc={typographyFunc}
    >
      {prefix ? `${prefix} ` : null}
      {showRelativeTime(timestamp, isRelative, format, timezone)}
      {suffix ? ` ${suffix}` : null}
    </Timestamp>
  );
};

TimestampContainer.propTypes = {
  timestamp: number.isRequired,
  dateTimeFormat: string.isRequired,
  isRelative: bool,
  format: string,
  timezone: string,
  prefix: string,
  suffix: string,
  padding: bool,
  typographyFunc: func,
};

TimestampContainer.defaultProps = {
  isRelative: false,
  format: null,
  timezone: 'Europe/London',
  prefix: null,
  suffix: null,
  padding: true,
  typographyFunc: null,
};

export default TimestampContainer;
