import { ref } from 'vue';
import { useHead } from '@unhead/vue';
// import { axiosv0 } from '@/plugins/axios';
// import { handleApiError } from '@/plugins/functions';

export function useMetaManagement(defaults = {}) {
  // A single reactive object to hold all head data.
  const head = ref({
    title: defaults.title || '',
    meta: defaults.meta || [],
    link: defaults.link || [],
  });

  // useHead is now called once with the reactive ref.
  // It will automatically update the DOM when `head.value` changes.
  useHead(head);

  // async function fetchMetaData(endpoint) {
  //   try {
  //     const response = await axiosv0.get(endpoint);
  //     if (response.status === 200 && response.data) {
  //       const fetchedData = response.data;

  //       // Update the reactive head object.
  //       // Fetched data takes precedence over defaults.
  //       head.value.title = fetchedData.title || head.value.title;

  //       // Replace meta/link arrays if the fetched data contains them.
  //       if (Array.isArray(fetchedData.meta) && fetchedData.meta.length > 0) {
  //         head.value.meta = fetchedData.meta;
  //       }

  //       if (Array.isArray(fetchedData.link) && fetchedData.link.length > 0) {
  //         head.value.link = fetchedData.link;
  //       }
  //     }
  //   } catch (error) {
  //     handleApiError(error, 'Fetch Page Metadata');
  //     // On error, the head remains with the default values.
  //   }
  // }

  return {
    // fetchMetaData,
    head,
  };
}
