.class public Landroidx/lifecycle/r;
.super Landroid/app/Fragment;
.source ""


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        Landroidx/lifecycle/r$a;
    }
.end annotation


# instance fields
.field private a:Landroidx/lifecycle/r$a;


# direct methods
.method public constructor <init>()V
    .locals 0

    invoke-direct {p0}, Landroid/app/Fragment;-><init>()V

    return-void
.end method

.method public static a(Landroid/app/Activity;)V
    .locals 3

    invoke-virtual {p0}, Landroid/app/Activity;->getFragmentManager()Landroid/app/FragmentManager;

    move-result-object p0

    const-string v0, "androidx.lifecycle.LifecycleDispatcher.report_fragment_tag"

    invoke-virtual {p0, v0}, Landroid/app/FragmentManager;->findFragmentByTag(Ljava/lang/String;)Landroid/app/Fragment;

    move-result-object v1

    if-nez v1, :cond_0

    invoke-virtual {p0}, Landroid/app/FragmentManager;->beginTransaction()Landroid/app/FragmentTransaction;

    move-result-object v1

    new-instance v2, Landroidx/lifecycle/r;

    invoke-direct {v2}, Landroidx/lifecycle/r;-><init>()V

    invoke-virtual {v1, v2, v0}, Landroid/app/FragmentTransaction;->add(Landroid/app/Fragment;Ljava/lang/String;)Landroid/app/FragmentTransaction;

    move-result-object v0

    invoke-virtual {v0}, Landroid/app/FragmentTransaction;->commit()I

    invoke-virtual {p0}, Landroid/app/FragmentManager;->executePendingTransactions()Z

    :cond_0
    return-void
.end method

.method private a(Landroidx/lifecycle/f$a;)V
    .locals 2

    invoke-virtual {p0}, Landroid/app/Fragment;->getActivity()Landroid/app/Activity;

    move-result-object v0

    instance-of v1, v0, Landroidx/lifecycle/k;

    if-eqz v1, :cond_0

    check-cast v0, Landroidx/lifecycle/k;

    invoke-interface {v0}, Landroidx/lifecycle/k;->a()Landroidx/lifecycle/j;

    move-result-object v0

    invoke-virtual {v0, p1}, Landroidx/lifecycle/j;->b(Landroidx/lifecycle/f$a;)V

    return-void

    :cond_0
    instance-of v1, v0, Landroidx/lifecycle/h;

    if-eqz v1, :cond_1

    check-cast v0, Landroidx/lifecycle/h;

    invoke-interface {v0}, Landroidx/lifecycle/h;->a()Landroidx/lifecycle/f;

    move-result-object v0

    instance-of v1, v0, Landroidx/lifecycle/j;

    if-eqz v1, :cond_1

    check-cast v0, Landroidx/lifecycle/j;

    invoke-virtual {v0, p1}, Landroidx/lifecycle/j;->b(Landroidx/lifecycle/f$a;)V

    :cond_1
    return-void
.end method

.method private a(Landroidx/lifecycle/r$a;)V
    .locals 0

    if-eqz p1, :cond_0

    invoke-interface {p1}, Landroidx/lifecycle/r$a;->onCreate()V

    :cond_0
    return-void
.end method

.method private b(Landroidx/lifecycle/r$a;)V
    .locals 0

    if-eqz p1, :cond_0

    invoke-interface {p1}, Landroidx/lifecycle/r$a;->a()V

    :cond_0
    return-void
.end method

.method private c(Landroidx/lifecycle/r$a;)V
    .locals 0

    if-eqz p1, :cond_0

    invoke-interface {p1}, Landroidx/lifecycle/r$a;->b()V

    :cond_0
    return-void
.end method


# virtual methods
.method public onActivityCreated(Landroid/os/Bundle;)V
    .locals 0

    invoke-super {p0, p1}, Landroid/app/Fragment;->onActivityCreated(Landroid/os/Bundle;)V

    iget-object p1, p0, Landroidx/lifecycle/r;->a:Landroidx/lifecycle/r$a;

    invoke-direct {p0, p1}, Landroidx/lifecycle/r;->a(Landroidx/lifecycle/r$a;)V

    sget-object p1, Landroidx/lifecycle/f$a;->ON_CREATE:Landroidx/lifecycle/f$a;

    invoke-direct {p0, p1}, Landroidx/lifecycle/r;->a(Landroidx/lifecycle/f$a;)V

    return-void
.end method

.method public onDestroy()V
    .locals 1

    invoke-super {p0}, Landroid/app/Fragment;->onDestroy()V

    sget-object v0, Landroidx/lifecycle/f$a;->ON_DESTROY:Landroidx/lifecycle/f$a;

    invoke-direct {p0, v0}, Landroidx/lifecycle/r;->a(Landroidx/lifecycle/f$a;)V

    const/4 v0, 0x0

    iput-object v0, p0, Landroidx/lifecycle/r;->a:Landroidx/lifecycle/r$a;

    return-void
.end method

.method public onPause()V
    .locals 1

    invoke-super {p0}, Landroid/app/Fragment;->onPause()V

    sget-object v0, Landroidx/lifecycle/f$a;->ON_PAUSE:Landroidx/lifecycle/f$a;

    invoke-direct {p0, v0}, Landroidx/lifecycle/r;->a(Landroidx/lifecycle/f$a;)V

    return-void
.end method

.method public onResume()V
    .locals 1

    invoke-super {p0}, Landroid/app/Fragment;->onResume()V

    iget-object v0, p0, Landroidx/lifecycle/r;->a:Landroidx/lifecycle/r$a;

    invoke-direct {p0, v0}, Landroidx/lifecycle/r;->b(Landroidx/lifecycle/r$a;)V

    sget-object v0, Landroidx/lifecycle/f$a;->ON_RESUME:Landroidx/lifecycle/f$a;

    invoke-direct {p0, v0}, Landroidx/lifecycle/r;->a(Landroidx/lifecycle/f$a;)V

    return-void
.end method

.method public onStart()V
    .locals 1

    invoke-super {p0}, Landroid/app/Fragment;->onStart()V

    iget-object v0, p0, Landroidx/lifecycle/r;->a:Landroidx/lifecycle/r$a;

    invoke-direct {p0, v0}, Landroidx/lifecycle/r;->c(Landroidx/lifecycle/r$a;)V

    sget-object v0, Landroidx/lifecycle/f$a;->ON_START:Landroidx/lifecycle/f$a;

    invoke-direct {p0, v0}, Landroidx/lifecycle/r;->a(Landroidx/lifecycle/f$a;)V

    return-void
.end method

.method public onStop()V
    .locals 1

    invoke-super {p0}, Landroid/app/Fragment;->onStop()V

    sget-object v0, Landroidx/lifecycle/f$a;->ON_STOP:Landroidx/lifecycle/f$a;

    invoke-direct {p0, v0}, Landroidx/lifecycle/r;->a(Landroidx/lifecycle/f$a;)V

    return-void
.end method
