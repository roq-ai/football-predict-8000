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
import { createBettorPrediction } from 'apiSdk/bettor-predictions';
import { Error } from 'components/error';
import { bettorPredictionValidationSchema } from 'validationSchema/bettor-predictions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BettorInterface } from 'interfaces/bettor';
import { PredictionInterface } from 'interfaces/prediction';
import { getBettors } from 'apiSdk/bettors';
import { getPredictions } from 'apiSdk/predictions';
import { BettorPredictionInterface } from 'interfaces/bettor-prediction';

function BettorPredictionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: BettorPredictionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createBettorPrediction(values);
      resetForm();
      router.push('/bettor-predictions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<BettorPredictionInterface>({
    initialValues: {
      bettor_id: (router.query.bettor_id as string) ?? null,
      prediction_id: (router.query.prediction_id as string) ?? null,
    },
    validationSchema: bettorPredictionValidationSchema,
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
            Create Bettor Prediction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<BettorInterface>
            formik={formik}
            name={'bettor_id'}
            label={'Select Bettor'}
            placeholder={'Select Bettor'}
            fetcher={getBettors}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.id}
              </option>
            )}
          />
          <AsyncSelect<PredictionInterface>
            formik={formik}
            name={'prediction_id'}
            label={'Select Prediction'}
            placeholder={'Select Prediction'}
            fetcher={getPredictions}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.predicted_result}
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
  entity: 'bettor_prediction',
  operation: AccessOperationEnum.CREATE,
})(BettorPredictionCreatePage);
