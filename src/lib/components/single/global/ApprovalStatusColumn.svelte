<script>
	import { approvalStatus } from "$lib/constants/user";
	import { getDisplayApprovalStatus } from "$lib/helpers/user";
    const { status } = $props()
</script>

{#if status === approvalStatus.REJECTED}
    <td class="p-2 text-red-700">{getDisplayApprovalStatus(status)}</td>
{:else if status === approvalStatus.APPROVED}
    <td class="p-2 text-green-700">{getDisplayApprovalStatus(status)}</td>
{:else}
    <td class="p-2 text-yellow-700">{getDisplayApprovalStatus(status)}</td>
{/if}