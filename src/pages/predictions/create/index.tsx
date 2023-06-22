import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPrediction } from 'apiSdk/predictions';
import { Error } from 'components/error';
import { predictionValidationSchema } from 'validationSchema/predictions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { MatchDataInterface } from 'interfaces/match-data';
import { OrganizationInterface } from 'interfaces/organization';
import { getMatchData } from 'apiSdk/match-data';
import { getOrganizations } from 'apiSdk/organizations';
import { PredictionInterface } from 'interfaces/prediction';

function PredictionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PredictionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPrediction(values);
      resetForm();
      router.push('/predictions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PredictionInterface>({
    initialValues: {
      predicted_result: '',
      match_id: (router.query.match_id as string) ?? null,
      organization_id: (router.query.organization_id as string) ?? null,
    },
    validationSchema: predictionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Prediction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="predicted_result" mb="4" isInvalid={!!formik.errors?.predicted_result}>
            <FormLabel>Predicted Result</FormLabel>
            <Input
              type="text"
              name="predicted_result"
              value={formik.values?.predicted_result}
              onChange={formik.handleChange}
            />
            {formik.errors.predicted_result && <FormErrorMessage>{formik.errors?.predicted_result}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<MatchDataInterface>
            formik={formik}
            name={'match_id'}
            label={'Select Match Data'}
            placeholder={'Select Match Data'}
            fetcher={getMatchData}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.data}
              </option>
            )}
          />
          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'prediction',
  operation: AccessOperationEnum.CREATE,
})(PredictionCreatePage);
