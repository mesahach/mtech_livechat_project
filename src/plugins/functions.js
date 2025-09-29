import { axiosv0, axiosv1 } from '@/plugins/axios';
// Use 'sweetalert2' directly for standalone functions
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Import `toast` and `ToastContainer` from vue3-toastify
import { toast, toastContainers } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

// You might also want to import the ToastContainer for your App.vue
export const ToastContainerComponent = toastContainers;

export function showAlert(title, text, icon) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
}

export async function showConfirm(title, text, icon, confirmButtonText, showNotification = true) {
    const result = await Swal.fire({
        title: title,
        text: text,
        icon: icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText
    });
    if (result.isConfirmed) {
        if (showNotification) {
            Swal.fire(
                'Notice',
                'Action Completed!',
                'success'
            );
        }
        return true; // This value is now part of the promise resolution
    } else { // Handle cancellation explicitly
        if (showNotification) {
            Swal.fire(
                'Notice',
                'Action failed!',
                'error'
            );
        }
        return false; // This value is now part of the promise resolution
    }
}

export function notify(message, type = 'default', theme = 'light') {
    toast(
        message,{
            type: type, // map your 'icon' to 'type'
        // Add other common toastify options here if you want defaults:
        // position: 'top-right',
        // autoClose: 3000,
        // hideProgressBar: false,
        // closeOnClick: true,
        // pauseOnHover: true,
        // draggable: true,
        theme: theme,
});
}

export function formatDate(inputDateStr, userTimeZone = 'Africa/Lagos') {
  if (!inputDateStr) return '';

  const timeZone = userTimeZone?.trim();

  // Ensure ISO-like format for Date constructor
  const compliantDateStr = inputDateStr.replace(' ', 'T');
  const date = new Date(compliantDateStr);

  if (isNaN(date)) {
    console.error('Invalid date provided to formatDate:', inputDateStr);
    return 'Invalid Date';
  }

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: timeZone
  };

  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  // Format as 'Month Day, Year at HH:MM AM/PM'
  const parts = formattedDate.split(',');
  if (parts.length >= 3) {
    return `${parts[0]},${parts[1]} at${parts[2]}`;
  }

  return formattedDate;
}


export function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
export function cleanCurrencyString(value) {
    if (typeof value !== "string") return Number(value);
    return Number(value.replace(/[$₦,]/g, "").trim());
  }

  export function getTicketPriceRange(tickets = [], currency = 'NGN') {
    if (!Array.isArray(tickets) || tickets.length === 0) return formatCurrency(0, currency);

    const prices = tickets
        .map(ticket => Number(ticket.ticket_price))
        .filter(price => !isNaN(price));

    if (prices.length === 0) return formatCurrency(0, currency);

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return min === max
        ? formatCurrency(min, currency)
        : `${formatCurrency(min, currency)} - ${formatCurrency(max, currency)}`;
}

export function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2
    }).format(amount);
}
  
export function currencyFormatter(currency) {
    const formatter = new Intl.NumberFormat("en", {
      style: "currency",
      currency: currency,
    });
  
    // Extract the currency symbol from the formatted string
    const formatted = formatter.format(0); // Example: $0.00
    return formatted.replace(/\d|\.|,|-|\s/g, ""); // Removes numbers and formatting
  }
  
export function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  
export function formatNumber(value) {
    // Convert the number to a string and use the toLocaleString method
    return parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // A generic error handler (replaces handleCatchHomeError)
export function handleApiError(error, context = "API Request") {
    console.error(`${context} failed:`, error);
    let errorMessage = `An error occurred during ${context}.`;

    if (error.response) {
        errorMessage = error.response.data?.message || error.response.statusText || errorMessage;
        notify(errorMessage, 'error');
    } else if (error.request) {
        errorMessage = 'No response received from server. Please check your internet connection.';
        notify(errorMessage, 'error');
    } else {
        errorMessage = error.message || errorMessage;
        notify(errorMessage, 'error');
    }
    return Promise.reject(error); // Re-throw for component-specific handling if needed
}

// Helper to load external scripts dynamically
export function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    // Check if the script is already on the page.
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      // If it exists, it might still be loading, so we check its readyState.
      if (existingScript.readyState === 'complete' || existingScript.readyState === 'loaded') {
        resolve();
      } else {
        existingScript.addEventListener('load', () => resolve());
        existingScript.addEventListener('error', (e) => reject(e));
      }
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      resolve();
    };

    script.onerror = (e) => {
      console.error(`Failed to load script: ${src}`, e);
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });
}

// For injecting raw HTML scripts (like pixels)
export function injectRawHtmlScript(htmlString) {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  // Handle <script> tags
  const scripts = tempDiv.querySelectorAll('script');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    for (let attr of script.attributes) {
      newScript.setAttribute(attr.name, attr.value);
    }
    newScript.textContent = script.textContent;
    document.head.appendChild(newScript);
  });

  // Handle <noscript> tags
  const noscripts = tempDiv.querySelectorAll('noscript');
  noscripts.forEach(noscript => {
    document.body.appendChild(noscript.cloneNode(true));
  });
}

export function unescapeJsString(str) {
  return str
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\")
    .replace(/\\\//g, "/")
    .replace(/<\\\/script>/g, "</script>");
}

export function setMetaTag(attribute, value, content) {
    let metaTag = document.querySelector(`meta[${attribute}="${value}"]`);
    if (metaTag) {
        metaTag.setAttribute("content", content);
    } else {
        metaTag = document.createElement("meta");
        metaTag.setAttribute(attribute, value);
        metaTag.setAttribute("content", content);
        document.head.appendChild(metaTag);
    }
}

export function handleRequestFailure() {
    console.log("Failed to load data, you may have a network problem. Would you like to reload the page?");
  }
  
export async function handleCatchHomeError(error) {
    if (error.message === "Network Error" && !error.response) {
      handleRequestFailure();
      return;
    }
    if (error.response) {
      if (error.response.status == 401 || error.response.status == 400) {
        // await sessionEnded();
        // notify("error", "Your session has ended");
        console.log(error.response);
      } else if (error.response.data && error.response.data.message) {
        // notify("error", error.response.data.message);
        console.log(error.response.data.message);
      } else {
        console.log(`could not complete request: ${error.message}`);
      }
    } else {
      console.log(`Unknown error: ${error.message}`);
    }
  }
  
export function getStatusBadgeClass(status) {
    switch ((status || "").toLowerCase()) {
      case "success":
        return "bg-success";
      case "failed":
      case "cancelled":
        return "bg-danger";
      case "pending":
        return "bg-warning";
      case "processing":
        return "bg-info";
      default:
        return "bg-warning"; // fallback for unknown status
    }
  }

  /**
  * Truncate a string to a given length, optionally stopping anywhere or at the last whole word.
  * 
  * @param {string} str - The input string to truncate.
  * @param {number} maxLength - The maximum length of the truncated string.
  * @param {boolean} stopAnywhere - If true, cut at exact character length; if false, stop at the last full word.
  * @returns {string}
  */
  export function truncate(str, maxLength, stopAnywhere = false) {
    if (typeof str !== 'string') return '';
    
    if (str.length > maxLength) {
        let truncated = str.substring(0, maxLength - 3);
        if (stopAnywhere) {
            return truncated + '...';
        } else {
            const lastSpace = truncated.lastIndexOf(' ');
            if (lastSpace > 0) {
                truncated = truncated.substring(0, lastSpace);
            }
            return truncated + '...';
        }
    }
    return str;
}

  
export async function loadStoredGoogleKeys(siteKey) {
  // const siteKey = process.env.VUE_APP_RECAPTCHA_SITE_KEY;
  // console.log("Key: " + siteKey);
  if (siteKey) {
    await loadExternalScript('https://www.google.com/recaptcha/api.js').then(() => {
      // grecaptcha.render('recaptcha', {
      //   sitekey: siteKey,
      //   callback: function (response) {
      //     console.log(response);
      //   },
      //   'expired-callback': function () {
      //     console.log('expired-callback');
      //   }
      // });
    });
  }
  return siteKey;
}

export async function loadGoogleKeys() {
    try {
      const response = await axiosv0.get("getGoogleCaptchaKey");

      if (response.status === 200 && response.data) {
        const googleKeys = response.data;

        if (googleKeys.recaptchaSiteKey) {
          await loadExternalScript("https://www.google.com/recaptcha/api.js").then(() => {
            window.recaptchaCallback = () => {};
          });
          return googleKeys.recaptchaSiteKey;
        } else {
          console.warn("Recaptcha site key is missing in the response.");
          return null;
        }
      }
    } catch (error) {
      console.error("Failed to load Google keys:", error);
      return null;
    }
  }

  /**
   * Fetches all terms and conditions from the server.
   * @returns {Promise<Array>} An array of terms and conditions.
   */
  export async function getTermsAndConditions() {
    try {
      const response = await axiosv0.get("getAllTermsAndConditions");
      if (response.status === 200 && response.data) {
        return response.data;
      }
    } catch (error) {
      await handleApiError(error, "Failed to fetch terms and conditions");
      return [];
    }
  }

  /**
   * Clears the form data and errors.
   * @param {Object} setters - The form setters object.
   */
// export function clearForm(setters) {
//   setters.setFormData({ name: '', email: '', message: '' });
//   setters.setErrors({ name: null, email: null, message: null, recaptcha: null });
//   }
// const validationMap = {
//   name: validateName,
//   email: validateEmail,
//   message: validateMessage,
// };

// const validateField = (field) => {
//   if (validationMap[field]) {
//   errors.value[field] = validationMap[field](formData.value[field]);
//   }
// };

export async function isLoggedIn() {
  //check if fetch will return status 200
  try {
    const response = await axiosv1.get("isLoggedIn");
    if (response.status === 200 && response.data) {
      return true;
    }
  } catch (error) {
    return false;
  }
}

export async function createEvent(eventData) {
    try {
        const response = await axiosv1.post("createEvent", eventData);
        if (response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        await handleApiError(error, "Failed to create event");
        return null;
    }
}
    
/**
 * Initializes a small CKEditor instance.
 * @param {string} editorName - The name of the editor.
 * @param {string} content - The initial content of the editor.
 * @param {string} height - The height of the editor.
 */
export function initSmallCKEditors(editorName, content = '', height = '300px') {
  if (window.CKEDITOR?.instances[editorName]) {
    window.CKEDITOR.instances[editorName].destroy(true);
  }

  const editorInstance = window.CKEDITOR.replace(editorName, {
    height: height,
    removePlugins: "elementspath,resize,image,image2",
    toolbar: [
      ["Undo", "Redo"],
      ["Source"],
      ["Cut", "Copy", "Paste", "PasteText", "PasteFromWord"],
      ["Bold", "Italic", "Underline", "Strike"],
      ["Subscript", "Superscript"],
      ["NumberedList", "BulletedList", "Outdent", "Indent"],
      ["JustifyLeft", "JustifyCenter", "JustifyRight", "JustifyBlock"],
      ["Link", "Unlink"],
      ["Font", "FontSize"],
      ["TextColor", "BGColor"],
      ["Format", "Styles"],
      ["Table"],
      ["Maximize"],
      ["RemoveFormat", "ShowBlocks"],
    ],
    fontSize_sizes: "8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px",
    font_names:
      "Arial/Arial, Helvetica, sans-serif;" +
      "Times New Roman/Times New Roman, Times, serif;" +
      "Verdana/Verdana, Geneva, sans-serif;" +
      "Georgia/Georgia, serif;" +
      "Courier New/Courier New, Courier, monospace;",
  });

  editorInstance.on("instanceReady", function () {
    editorInstance.setData(content);
  });

  return editorInstance;
}

/**
 * Initializes a large CKEditor instance.
 * @param {string} editorName - The name of the editor.
 * @param {string} content - The initial content of the editor.
 * @param {string} height - The height of the editor.
 */
export function initLargeCKEditor(editorName, content = '', height = '250px') {
  if (window.CKEDITOR?.instances[editorName]) {
    window.CKEDITOR.instances[editorName].destroy(true);
  }

  const editorInstance = window.CKEDITOR.replace(editorName, {
    height: height,
  });

  window.CKEDITOR.on("dialogDefinition", (e) => {
    const dialogName = e.data.name;
    const dialogDefinition = e.data.definition;

    if (dialogName === "image") {
      dialogDefinition.removeContents("Link");
      dialogDefinition.removeContents("advanced");

      const tabContent = dialogDefinition.getContents("info");
      tabContent.remove("txtHSpace");
      tabContent.remove("txtVSpace");
    }
  });

  editorInstance.on("instanceReady", function () {
    editorInstance.setData(content);
  });

  return editorInstance;
}

export async function fetchEventsToAttend() {
    try {
        const response = await axiosv1.get("getEventsToAttend");
        if (response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        await handleApiError(error, "Failed to fetch events to attend");
        return [];
    }
}

export async function fetchEventsIHost() {
    try {
        const response = await axiosv1.get("getEventsIHost");
        if (response.status === 200 && response.data) {
            return response.data;
        }
    } catch (error) {
        await handleApiError(error, "Failed to fetch events I host");
        return [];
    }
}
    
export async function fetchEvents({
  page = 1,
  limit = 20,
  search = "",
  category = "",
  sort = "",
  date_from = "",
  date_to = "",
  type = "allEvents"
}) {
  try {
      const payload = {
          page,
          limit,
          ...(search && { search }),
          ...(category && { category }),
          ...(sort && { sort }),
          ...(date_from && { date_from }),
          ...(date_to && { date_to }),
      };

      const response = await axiosv1.get(type, {
          params: payload
      });

      if (response.status === 200 && response.data) {
          return response.data;
      }
  } catch (error) {
    await handleApiError(error, "Failed to fetch events");
    return [];
  }
}

export async function fetchCategories() {
  try {
    const response = await axiosv0.get("getAllCategories");
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    await handleApiError(error, "Failed to fetch categories");
    return [];
  }
}

export async function fetchUserData() {
  try {
    const response = await axiosv1.get("getUserData");
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    await handleApiError(error, "Failed to fetch user data");
    return null;
  }
}

export async function getEvent(eventId) {
  try {
    const response = await axiosv1.get(`getEvent/${eventId}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
  } catch (error) {
    await handleApiError(error, `Failed to fetch event ${eventId}`);
    return null;
  }
}