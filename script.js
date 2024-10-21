// Port descriptions object (unchanged)
const descriptions = {
    "FTP": "File Transfer Protocol (FTP) uses these ports for transferring files between a client and a server over a network. Port 20 is used for data transfer, while port 21 is used for control commands and establishing the connection.",
    "SSH": "Secure Shell (SSH) is a secure protocol for remote administration and secure communication over an insecure network. Port 22 is used for secure shell connections, providing encrypted communication and secure remote access to systems.",
    "Telnet": "Telnet is a protocol that allows remote access to devices and systems. Port 23 is used for Telnet connections, which provide a text-based interface to control and manage devices remotely. However, Telnet is considered insecure, and the use of SSH is recommended instead.",
    "SMTP": "Simple Mail Transfer Protocol (SMTP) is used for sending email messages between mail servers. Port 25 is the default port for SMTP, facilitating the transmission of outgoing mail from a client to a mail server.",
    "DNS": "Domain Name System (DNS) is responsible for translating domain names into IP addresses. Port 53 is used for DNS queries and responses, allowing devices to resolve domain names to their corresponding IP addresses.",
    "DHCP": "Dynamic Host Configuration Protocol (DHCP) is used for dynamically assigning IP addresses and network configuration information to devices on a network. Ports 67 and 68 are used for DHCP server-client communication.",
    "HTTP": "Hypertext Transfer Protocol (HTTP) is used for web browsing and transferring hypertext resources over the Internet. Port 80 is the default port for HTTP communication, enabling communication between web servers and clients.",
    "POP3": "Post Office Protocol 3 (POP3) is an email retrieval protocol. Port 110 is used for POP3 connections, allowing email clients to retrieve email from a mail server.",
    "NetBIOS/NetBT": "NetBIOS (Network Basic Input/Output System) and NetBT (NetBIOS over TCP/IP) are protocols used for communication between devices on a local network. Ports 137 and 139 are used for NetBIOS Name Service and NetBIOS Session Service, respectively.",
    "IMAP": "Internet Message Access Protocol (IMAP) is an email retrieval protocol that offers more advanced features than POP3. Port 143 is used for IMAP connections, enabling email clients to access and manage email on a remote mail server.",
    "SNMP": "Simple Network Management Protocol (SNMP) is used for network monitoring and management. Port 161 is used for SNMP queries, while port 162 is used for SNMP trap notifications.",
    "LDAP": "Lightweight Directory Access Protocol (LDAP) is used for accessing and maintaining directory services. Port 389 is the default port for LDAP, facilitating the querying and management of directory information.",
    "HTTPS": "Hypertext Transfer Protocol Secure (HTTPS) is the secure version of HTTP, providing encrypted communication for secure web browsing. Port 443 is the default port for HTTPS connections, ensuring secure data transmission over the Internet.",
    "SMB/CIFS": "Server Message Block (SMB) is a file- and printer-sharing protocol commonly used by Microsoft Windows. Port 445 is used for SMB/CIFS communication, allowing devices to share files, printers, and other resources over a network.",
    "RDP": "Remote Desktop Protocol (RDP) is used for remote access to computers and systems. Port 3389 is the default port for RDP, enabling remote desktop control."
};

let selectedPort = null;
let selectedService = null;

// Function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to reset the game
function resetGame() {
    // Reset port and service colors and locked status
    portItems.forEach(port => {
        port.style.backgroundColor = "";
        port.classList.remove('locked');
    });
    serviceItems.forEach(service => {
        service.style.backgroundColor = "";
        service.classList.remove('locked');
        service.innerHTML = service.innerHTML.replace(' ❌', '');
    });

    selectedPort = null;

    // Shuffle and re-order the ports
    const portList = document.getElementById('portList');
    const portArray = Array.from(portList.children);
    const shuffledPorts = shuffleArray(portArray);

    // Clear the existing list and append the shuffled ports
    portList.innerHTML = '';
    shuffledPorts.forEach(port => {
        portList.appendChild(port);
    });

    // Clear any success message
    const message = document.getElementById('successMessage');
    if (message) {
        message.remove();
    }
}

// Function to check if all answers are correct
function checkAnswers() {
    let allCorrect = true;

    // Check each service if it's matched correctly with a locked port
    serviceItems.forEach(service => {
        const servicePort = service.getAttribute('data-port');
        const matchedPort = document.querySelector(`#portList li.locked[data-port="${servicePort}"]`);
        if (!matchedPort) {
            allCorrect = false;
        }
    });

    if (allCorrect) {
        displaySuccessMessage();
    } else {
        alert("Not all matches are correct. Keep trying!");
    }
}

// Function to display the success message
function displaySuccessMessage() {
    const message = document.createElement('p');
    message.textContent = "Amazing! You are one step away from mastery. Don't give up.";
    message.id = "successMessage";
    document.body.appendChild(message);
}

// Event listeners for port items
const portItems = document.querySelectorAll('#portList li');
portItems.forEach(portItem => {
    portItem.addEventListener('click', function() {
        // Deselect if already selected
        if (selectedPort === this) {
            this.style.backgroundColor = "";
            selectedPort = null;
        } else {
            // Deselect previous selection
            if (selectedPort) {
                selectedPort.style.backgroundColor = "";
            }
            // Select new port
            selectedPort = this;
            this.style.backgroundColor = "blue";
        }
    });
});

// Event listeners for service items
const serviceItems = document.querySelectorAll('#serviceList li');
serviceItems.forEach(serviceItem => {
    serviceItem.addEventListener('click', function() {
        if (!selectedPort) {
            alert("Please select a port first.");
            return;
        }

        const servicePort = this.getAttribute('data-port');
        const portNumber = selectedPort.getAttribute('data-port');

        // Check if the port and service match
        if (servicePort === portNumber) {
            // Correct match, lock both to blue
            selectedPort.style.backgroundColor = "blue";
            this.style.backgroundColor = "blue";
            selectedPort.classList.add('locked');
            this.classList.add('locked');
        } else {
            // Incorrect match, show an "X" on the service
            this.innerHTML += ' ❌';
            setTimeout(() => {
                this.innerHTML = this.innerHTML.replace(' ❌', '');
            }, 1000);
        }

        // Clear the selected port after checking
        selectedPort.style.backgroundColor = "";
        selectedPort = null;
    });
});

// Reset button functionality
const resetButton = document.createElement('button');
resetButton.textContent = "Reset";
resetButton.addEventListener('click', resetGame);
document.body.appendChild(resetButton);

// Submit button functionality
const submitButton = document.createElement('button');
submitButton.textContent = "Submit";
submitButton.addEventListener('click', checkAnswers);
document.body.appendChild(submitButton);
