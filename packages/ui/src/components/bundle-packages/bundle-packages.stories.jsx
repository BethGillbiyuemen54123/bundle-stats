import React from 'react';
import { merge, set } from 'lodash';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundlePackages } from '.';

const JOBS = createJobs([
  { webpack: currentStats },
  { webpack: baselineStats },
]);
const [currentJob, baselineJob] = JOBS;

const stories = storiesOf('Components/BundlePackages', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <BundlePackages jobs={[baselineJob]} />);

stories.add('multiple jobs', () => <BundlePackages jobs={JOBS} />);

stories.add('empty packages', () => (
  <BundlePackages
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.packages', {}),
      set(merge({}, baselineJob), 'metrics.webpack.packages', {}),
    ]}
  />
));

stories.add('empty filtered packages', () => (
  <BundlePackages
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.packages', { 'package-a': { value: 100 } }),
      set(merge({}, baselineJob), 'metrics.webpack.packages', { 'package-a': { value: 100 } }),
    ]}
  />
));

const JOBS_EMPTY_BASELINE = createJobs([
  { webpack: currentStats },
  { webpack: null },
]);

stories.add('empty baseline', () => <BundlePackages jobs={JOBS_EMPTY_BASELINE} />);
