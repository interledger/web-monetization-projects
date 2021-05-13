.class public La/j/a/i;
.super Landroidx/core/app/c;
.source ""

# interfaces
.implements Landroidx/lifecycle/v;
.implements Landroidx/core/app/a$a;
.implements Landroidx/core/app/a$c;


# annotations
.annotation system Ldalvik/annotation/MemberClasses;
    value = {
        La/j/a/i$a;,
        La/j/a/i$b;
    }
.end annotation


# instance fields
.field final c:Landroid/os/Handler;

.field final d:La/j/a/k;

.field private e:Landroidx/lifecycle/u;

.field f:Z

.field g:Z

.field h:Z

.field i:Z

.field j:Z

.field k:I

.field l:La/d/j;
    .annotation system Ldalvik/annotation/Signature;
        value = {
            "La/d/j<",
            "Ljava/lang/String;",
            ">;"
        }
    .end annotation
.end field


# direct methods
.method public constructor <init>()V
    .locals 1

    invoke-direct {p0}, Landroidx/core/app/c;-><init>()V

    new-instance v0, La/j/a/h;

    invoke-direct {v0, p0}, La/j/a/h;-><init>(La/j/a/i;)V

    iput-object v0, p0, La/j/a/i;->c:Landroid/os/Handler;

    new-instance v0, La/j/a/i$a;

    invoke-direct {v0, p0}, La/j/a/i$a;-><init>(La/j/a/i;)V

    invoke-static {v0}, La/j/a/k;->a(La/j/a/l;)La/j/a/k;

    move-result-object v0

    iput-object v0, p0, La/j/a/i;->d:La/j/a/k;

    const/4 v0, 0x1

    iput-boolean v0, p0, La/j/a/i;->h:Z

    return-void
.end method

.method static a(I)V
    .locals 1

    const/high16 v0, -0x10000

    and-int/2addr p0, v0

    if-nez p0, :cond_0

    return-void

    :cond_0
    new-instance p0, Ljava/lang/IllegalArgumentException;

    const-string v0, "Can only use lower 16 bits for requestCode"

    invoke-direct {p0, v0}, Ljava/lang/IllegalArgumentException;-><init>(Ljava/lang/String;)V

    throw p0
.end method

.method private static a(La/j/a/m;Landroidx/lifecycle/f$b;)Z
    .locals 4

    invoke-virtual {p0}, La/j/a/m;->a()Ljava/util/List;

    move-result-object p0

    invoke-interface {p0}, Ljava/util/Collection;->iterator()Ljava/util/Iterator;

    move-result-object p0

    const/4 v0, 0x0

    :cond_0
    :goto_0
    invoke-interface {p0}, Ljava/util/Iterator;->hasNext()Z

    move-result v1

    if-eqz v1, :cond_3

    invoke-interface {p0}, Ljava/util/Iterator;->next()Ljava/lang/Object;

    move-result-object v1

    check-cast v1, La/j/a/g;

    if-nez v1, :cond_1

    goto :goto_0

    :cond_1
    invoke-virtual {v1}, La/j/a/g;->a()Landroidx/lifecycle/f;

    move-result-object v2

    invoke-virtual {v2}, Landroidx/lifecycle/f;->a()Landroidx/lifecycle/f$b;

    move-result-object v2

    sget-object v3, Landroidx/lifecycle/f$b;->d:Landroidx/lifecycle/f$b;

    invoke-virtual {v2, v3}, Landroidx/lifecycle/f$b;->a(Landroidx/lifecycle/f$b;)Z

    move-result v2

    if-eqz v2, :cond_2

    iget-object v0, v1, La/j/a/g;->U:Landroidx/lifecycle/j;

    invoke-virtual {v0, p1}, Landroidx/lifecycle/j;->a(Landroidx/lifecycle/f$b;)V

    const/4 v0, 0x1

    :cond_2
    invoke-virtual {v1}, La/j/a/g;->O()La/j/a/m;

    move-result-object v1

    if-eqz v1, :cond_0

    invoke-static {v1, p1}, La/j/a/i;->a(La/j/a/m;Landroidx/lifecycle/f$b;)Z

    move-result v1

    or-int/2addr v0, v1

    goto :goto_0

    :cond_3
    return v0
.end method

.method private h()V
    .locals 2

    :cond_0
    invoke-virtual {p0}, La/j/a/i;->d()La/j/a/m;

    move-result-object v0

    sget-object v1, Landroidx/lifecycle/f$b;->c:Landroidx/lifecycle/f$b;

    invoke-static {v0, v1}, La/j/a/i;->a(La/j/a/m;Landroidx/lifecycle/f$b;)Z

    move-result v0

    if-nez v0, :cond_0

    return-void
.end method


# virtual methods
.method final a(Landroid/view/View;Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;
    .locals 1

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0, p1, p2, p3, p4}, La/j/a/k;->a(Landroid/view/View;Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;

    move-result-object p1

    return-object p1
.end method

.method public a()Landroidx/lifecycle/f;
    .locals 1

    invoke-super {p0}, Landroidx/core/app/c;->a()Landroidx/lifecycle/f;

    move-result-object v0

    return-object v0
.end method

.method public a(La/j/a/g;)V
    .locals 0

    return-void
.end method

.method protected a(Landroid/view/View;Landroid/view/Menu;)Z
    .locals 1

    const/4 v0, 0x0

    invoke-super {p0, v0, p1, p2}, Landroid/app/Activity;->onPreparePanel(ILandroid/view/View;Landroid/view/Menu;)Z

    move-result p1

    return p1
.end method

.method public b()Landroidx/lifecycle/u;
    .locals 2

    invoke-virtual {p0}, Landroid/app/Activity;->getApplication()Landroid/app/Application;

    move-result-object v0

    if-eqz v0, :cond_2

    iget-object v0, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    if-nez v0, :cond_1

    invoke-virtual {p0}, Landroid/app/Activity;->getLastNonConfigurationInstance()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/i$b;

    if-eqz v0, :cond_0

    iget-object v0, v0, La/j/a/i$b;->b:Landroidx/lifecycle/u;

    iput-object v0, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    :cond_0
    iget-object v0, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    if-nez v0, :cond_1

    new-instance v0, Landroidx/lifecycle/u;

    invoke-direct {v0}, Landroidx/lifecycle/u;-><init>()V

    iput-object v0, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    :cond_1
    iget-object v0, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    return-object v0

    :cond_2
    new-instance v0, Ljava/lang/IllegalStateException;

    const-string v1, "Your activity is not yet attached to the Application instance. You can\'t request ViewModel before onCreate call."

    invoke-direct {v0, v1}, Ljava/lang/IllegalStateException;-><init>(Ljava/lang/String;)V

    throw v0
.end method

.method public d()La/j/a/m;
    .locals 1

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->j()La/j/a/m;

    move-result-object v0

    return-object v0
.end method

.method public dump(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V
    .locals 2

    invoke-super {p0, p1, p2, p3, p4}, Landroid/app/Activity;->dump(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V

    invoke-virtual {p3, p1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v0, "Local FragmentActivity "

    invoke-virtual {p3, v0}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    invoke-static {p0}, Ljava/lang/System;->identityHashCode(Ljava/lang/Object;)I

    move-result v0

    invoke-static {v0}, Ljava/lang/Integer;->toHexString(I)Ljava/lang/String;

    move-result-object v0

    invoke-virtual {p3, v0}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v0, " State:"

    invoke-virtual {p3, v0}, Ljava/io/PrintWriter;->println(Ljava/lang/String;)V

    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    invoke-virtual {v0, p1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, "  "

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    invoke-virtual {p3, v0}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    const-string v1, "mCreated="

    invoke-virtual {p3, v1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-boolean v1, p0, La/j/a/i;->f:Z

    invoke-virtual {p3, v1}, Ljava/io/PrintWriter;->print(Z)V

    const-string v1, " mResumed="

    invoke-virtual {p3, v1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-boolean v1, p0, La/j/a/i;->g:Z

    invoke-virtual {p3, v1}, Ljava/io/PrintWriter;->print(Z)V

    const-string v1, " mStopped="

    invoke-virtual {p3, v1}, Ljava/io/PrintWriter;->print(Ljava/lang/String;)V

    iget-boolean v1, p0, La/j/a/i;->h:Z

    invoke-virtual {p3, v1}, Ljava/io/PrintWriter;->print(Z)V

    invoke-virtual {p0}, Landroid/app/Activity;->getApplication()Landroid/app/Application;

    move-result-object v1

    if-eqz v1, :cond_0

    invoke-static {p0}, La/l/a/a;->a(Landroidx/lifecycle/h;)La/l/a/a;

    move-result-object v1

    invoke-virtual {v1, v0, p2, p3, p4}, La/l/a/a;->a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V

    :cond_0
    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->j()La/j/a/m;

    move-result-object v0

    invoke-virtual {v0, p1, p2, p3, p4}, La/j/a/m;->a(Ljava/lang/String;Ljava/io/FileDescriptor;Ljava/io/PrintWriter;[Ljava/lang/String;)V

    return-void
.end method

.method protected e()V
    .locals 1

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->f()V

    return-void
.end method

.method public f()Ljava/lang/Object;
    .locals 1

    const/4 v0, 0x0

    return-object v0
.end method

.method public g()V
    .locals 0
    .annotation runtime Ljava/lang/Deprecated;
    .end annotation

    invoke-virtual {p0}, Landroid/app/Activity;->invalidateOptionsMenu()V

    return-void
.end method

.method protected onActivityResult(IILandroid/content/Intent;)V
    .locals 3

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->k()V

    shr-int/lit8 v0, p1, 0x10

    if-eqz v0, :cond_2

    add-int/lit8 v0, v0, -0x1

    iget-object v1, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v1, v0}, La/d/j;->b(I)Ljava/lang/Object;

    move-result-object v1

    check-cast v1, Ljava/lang/String;

    iget-object v2, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v2, v0}, La/d/j;->d(I)V

    const-string v0, "FragmentActivity"

    if-nez v1, :cond_0

    const-string p1, "Activity result delivered for unknown Fragment."

    invoke-static {v0, p1}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    return-void

    :cond_0
    iget-object v2, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v2, v1}, La/j/a/k;->a(Ljava/lang/String;)La/j/a/g;

    move-result-object v2

    if-nez v2, :cond_1

    new-instance p1, Ljava/lang/StringBuilder;

    invoke-direct {p1}, Ljava/lang/StringBuilder;-><init>()V

    const-string p2, "Activity result no fragment exists for who: "

    invoke-virtual {p1, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p1, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-static {v0, p1}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    goto :goto_0

    :cond_1
    const v0, 0xffff

    and-int/2addr p1, v0

    invoke-virtual {v2, p1, p2, p3}, La/j/a/g;->a(IILandroid/content/Intent;)V

    :goto_0
    return-void

    :cond_2
    invoke-static {}, Landroidx/core/app/a;->a()Landroidx/core/app/a$b;

    move-result-object v0

    if-eqz v0, :cond_3

    invoke-interface {v0, p0, p1, p2, p3}, Landroidx/core/app/a$b;->a(Landroid/app/Activity;IILandroid/content/Intent;)Z

    move-result v0

    if-eqz v0, :cond_3

    return-void

    :cond_3
    invoke-super {p0, p1, p2, p3}, Landroid/app/Activity;->onActivityResult(IILandroid/content/Intent;)V

    return-void
.end method

.method public onBackPressed()V
    .locals 4

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->j()La/j/a/m;

    move-result-object v0

    invoke-virtual {v0}, La/j/a/m;->b()Z

    move-result v1

    if-eqz v1, :cond_0

    sget v2, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v3, 0x19

    if-gt v2, v3, :cond_0

    return-void

    :cond_0
    if-nez v1, :cond_1

    invoke-virtual {v0}, La/j/a/m;->c()Z

    move-result v0

    if-nez v0, :cond_2

    :cond_1
    invoke-super {p0}, Landroid/app/Activity;->onBackPressed()V

    :cond_2
    return-void
.end method

.method public onConfigurationChanged(Landroid/content/res/Configuration;)V
    .locals 1

    invoke-super {p0, p1}, Landroid/app/Activity;->onConfigurationChanged(Landroid/content/res/Configuration;)V

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->k()V

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0, p1}, La/j/a/k;->a(Landroid/content/res/Configuration;)V

    return-void
.end method

.method protected onCreate(Landroid/os/Bundle;)V
    .locals 6

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    const/4 v1, 0x0

    invoke-virtual {v0, v1}, La/j/a/k;->a(La/j/a/g;)V

    invoke-super {p0, p1}, Landroidx/core/app/c;->onCreate(Landroid/os/Bundle;)V

    invoke-virtual {p0}, Landroid/app/Activity;->getLastNonConfigurationInstance()Ljava/lang/Object;

    move-result-object v0

    check-cast v0, La/j/a/i$b;

    if-eqz v0, :cond_0

    iget-object v2, v0, La/j/a/i$b;->b:Landroidx/lifecycle/u;

    if-eqz v2, :cond_0

    iget-object v3, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    if-nez v3, :cond_0

    iput-object v2, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    :cond_0
    const/4 v2, 0x0

    if-eqz p1, :cond_4

    const-string v3, "android:support:fragments"

    invoke-virtual {p1, v3}, Landroid/os/Bundle;->getParcelable(Ljava/lang/String;)Landroid/os/Parcelable;

    move-result-object v3

    iget-object v4, p0, La/j/a/i;->d:La/j/a/k;

    if-eqz v0, :cond_1

    iget-object v1, v0, La/j/a/i$b;->c:La/j/a/u;

    :cond_1
    invoke-virtual {v4, v3, v1}, La/j/a/k;->a(Landroid/os/Parcelable;La/j/a/u;)V

    const-string v0, "android:support:next_request_index"

    invoke-virtual {p1, v0}, Landroid/os/Bundle;->containsKey(Ljava/lang/String;)Z

    move-result v1

    if-eqz v1, :cond_4

    invoke-virtual {p1, v0}, Landroid/os/Bundle;->getInt(Ljava/lang/String;)I

    move-result v0

    iput v0, p0, La/j/a/i;->k:I

    const-string v0, "android:support:request_indicies"

    invoke-virtual {p1, v0}, Landroid/os/Bundle;->getIntArray(Ljava/lang/String;)[I

    move-result-object v0

    const-string v1, "android:support:request_fragment_who"

    invoke-virtual {p1, v1}, Landroid/os/Bundle;->getStringArray(Ljava/lang/String;)[Ljava/lang/String;

    move-result-object p1

    if-eqz v0, :cond_3

    if-eqz p1, :cond_3

    array-length v1, v0

    array-length v3, p1

    if-eq v1, v3, :cond_2

    goto :goto_1

    :cond_2
    new-instance v1, La/d/j;

    array-length v3, v0

    invoke-direct {v1, v3}, La/d/j;-><init>(I)V

    iput-object v1, p0, La/j/a/i;->l:La/d/j;

    move v1, v2

    :goto_0
    array-length v3, v0

    if-ge v1, v3, :cond_4

    iget-object v3, p0, La/j/a/i;->l:La/d/j;

    aget v4, v0, v1

    aget-object v5, p1, v1

    invoke-virtual {v3, v4, v5}, La/d/j;->c(ILjava/lang/Object;)V

    add-int/lit8 v1, v1, 0x1

    goto :goto_0

    :cond_3
    :goto_1
    const-string p1, "FragmentActivity"

    const-string v0, "Invalid requestCode mapping in savedInstanceState."

    invoke-static {p1, v0}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    :cond_4
    iget-object p1, p0, La/j/a/i;->l:La/d/j;

    if-nez p1, :cond_5

    new-instance p1, La/d/j;

    invoke-direct {p1}, La/d/j;-><init>()V

    iput-object p1, p0, La/j/a/i;->l:La/d/j;

    iput v2, p0, La/j/a/i;->k:I

    :cond_5
    iget-object p1, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {p1}, La/j/a/k;->b()V

    return-void
.end method

.method public onCreatePanelMenu(ILandroid/view/Menu;)Z
    .locals 2

    if-nez p1, :cond_0

    invoke-super {p0, p1, p2}, Landroid/app/Activity;->onCreatePanelMenu(ILandroid/view/Menu;)Z

    move-result p1

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {p0}, Landroid/app/Activity;->getMenuInflater()Landroid/view/MenuInflater;

    move-result-object v1

    invoke-virtual {v0, p2, v1}, La/j/a/k;->a(Landroid/view/Menu;Landroid/view/MenuInflater;)Z

    move-result p2

    or-int/2addr p1, p2

    return p1

    :cond_0
    invoke-super {p0, p1, p2}, Landroid/app/Activity;->onCreatePanelMenu(ILandroid/view/Menu;)Z

    move-result p1

    return p1
.end method

.method public onCreateView(Landroid/view/View;Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;
    .locals 1

    invoke-virtual {p0, p1, p2, p3, p4}, La/j/a/i;->a(Landroid/view/View;Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;

    move-result-object v0

    if-nez v0, :cond_0

    invoke-super {p0, p1, p2, p3, p4}, Landroid/app/Activity;->onCreateView(Landroid/view/View;Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;

    move-result-object p1

    return-object p1

    :cond_0
    return-object v0
.end method

.method public onCreateView(Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;
    .locals 1

    const/4 v0, 0x0

    invoke-virtual {p0, v0, p1, p2, p3}, La/j/a/i;->a(Landroid/view/View;Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;

    move-result-object v0

    if-nez v0, :cond_0

    invoke-super {p0, p1, p2, p3}, Landroid/app/Activity;->onCreateView(Ljava/lang/String;Landroid/content/Context;Landroid/util/AttributeSet;)Landroid/view/View;

    move-result-object p1

    return-object p1

    :cond_0
    return-object v0
.end method

.method protected onDestroy()V
    .locals 1

    invoke-super {p0}, Landroid/app/Activity;->onDestroy()V

    iget-object v0, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    if-eqz v0, :cond_0

    invoke-virtual {p0}, Landroid/app/Activity;->isChangingConfigurations()Z

    move-result v0

    if-nez v0, :cond_0

    iget-object v0, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    invoke-virtual {v0}, Landroidx/lifecycle/u;->a()V

    :cond_0
    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->c()V

    return-void
.end method

.method public onLowMemory()V
    .locals 1

    invoke-super {p0}, Landroid/app/Activity;->onLowMemory()V

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->d()V

    return-void
.end method

.method public onMenuItemSelected(ILandroid/view/MenuItem;)Z
    .locals 1

    invoke-super {p0, p1, p2}, Landroid/app/Activity;->onMenuItemSelected(ILandroid/view/MenuItem;)Z

    move-result v0

    if-eqz v0, :cond_0

    const/4 p1, 0x1

    return p1

    :cond_0
    if-eqz p1, :cond_2

    const/4 v0, 0x6

    if-eq p1, v0, :cond_1

    const/4 p1, 0x0

    return p1

    :cond_1
    iget-object p1, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {p1, p2}, La/j/a/k;->a(Landroid/view/MenuItem;)Z

    move-result p1

    return p1

    :cond_2
    iget-object p1, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {p1, p2}, La/j/a/k;->b(Landroid/view/MenuItem;)Z

    move-result p1

    return p1
.end method

.method public onMultiWindowModeChanged(Z)V
    .locals 1

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0, p1}, La/j/a/k;->a(Z)V

    return-void
.end method

.method protected onNewIntent(Landroid/content/Intent;)V
    .locals 0

    invoke-super {p0, p1}, Landroid/app/Activity;->onNewIntent(Landroid/content/Intent;)V

    iget-object p1, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {p1}, La/j/a/k;->k()V

    return-void
.end method

.method public onPanelClosed(ILandroid/view/Menu;)V
    .locals 1

    if-eqz p1, :cond_0

    goto :goto_0

    :cond_0
    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0, p2}, La/j/a/k;->a(Landroid/view/Menu;)V

    :goto_0
    invoke-super {p0, p1, p2}, Landroid/app/Activity;->onPanelClosed(ILandroid/view/Menu;)V

    return-void
.end method

.method protected onPause()V
    .locals 2

    invoke-super {p0}, Landroid/app/Activity;->onPause()V

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/i;->g:Z

    iget-object v0, p0, La/j/a/i;->c:Landroid/os/Handler;

    const/4 v1, 0x2

    invoke-virtual {v0, v1}, Landroid/os/Handler;->hasMessages(I)Z

    move-result v0

    if-eqz v0, :cond_0

    iget-object v0, p0, La/j/a/i;->c:Landroid/os/Handler;

    invoke-virtual {v0, v1}, Landroid/os/Handler;->removeMessages(I)V

    invoke-virtual {p0}, La/j/a/i;->e()V

    :cond_0
    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->e()V

    return-void
.end method

.method public onPictureInPictureModeChanged(Z)V
    .locals 1

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0, p1}, La/j/a/k;->b(Z)V

    return-void
.end method

.method protected onPostResume()V
    .locals 2

    invoke-super {p0}, Landroid/app/Activity;->onPostResume()V

    iget-object v0, p0, La/j/a/i;->c:Landroid/os/Handler;

    const/4 v1, 0x2

    invoke-virtual {v0, v1}, Landroid/os/Handler;->removeMessages(I)V

    invoke-virtual {p0}, La/j/a/i;->e()V

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->i()Z

    return-void
.end method

.method public onPreparePanel(ILandroid/view/View;Landroid/view/Menu;)Z
    .locals 0

    if-nez p1, :cond_0

    if-eqz p3, :cond_0

    invoke-virtual {p0, p2, p3}, La/j/a/i;->a(Landroid/view/View;Landroid/view/Menu;)Z

    move-result p1

    iget-object p2, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {p2, p3}, La/j/a/k;->b(Landroid/view/Menu;)Z

    move-result p2

    or-int/2addr p1, p2

    return p1

    :cond_0
    invoke-super {p0, p1, p2, p3}, Landroid/app/Activity;->onPreparePanel(ILandroid/view/View;Landroid/view/Menu;)Z

    move-result p1

    return p1
.end method

.method public onRequestPermissionsResult(I[Ljava/lang/String;[I)V
    .locals 4

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->k()V

    shr-int/lit8 v0, p1, 0x10

    const v1, 0xffff

    and-int/2addr v0, v1

    if-eqz v0, :cond_2

    add-int/lit8 v0, v0, -0x1

    iget-object v2, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v2, v0}, La/d/j;->b(I)Ljava/lang/Object;

    move-result-object v2

    check-cast v2, Ljava/lang/String;

    iget-object v3, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v3, v0}, La/d/j;->d(I)V

    const-string v0, "FragmentActivity"

    if-nez v2, :cond_0

    const-string p1, "Activity result delivered for unknown Fragment."

    invoke-static {v0, p1}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    return-void

    :cond_0
    iget-object v3, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v3, v2}, La/j/a/k;->a(Ljava/lang/String;)La/j/a/g;

    move-result-object v3

    if-nez v3, :cond_1

    new-instance p1, Ljava/lang/StringBuilder;

    invoke-direct {p1}, Ljava/lang/StringBuilder;-><init>()V

    const-string p2, "Activity result no fragment exists for who: "

    invoke-virtual {p1, p2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {p1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object p1

    invoke-static {v0, p1}, Landroid/util/Log;->w(Ljava/lang/String;Ljava/lang/String;)I

    goto :goto_0

    :cond_1
    and-int/2addr p1, v1

    invoke-virtual {v3, p1, p2, p3}, La/j/a/g;->a(I[Ljava/lang/String;[I)V

    :cond_2
    :goto_0
    return-void
.end method

.method protected onResume()V
    .locals 2

    invoke-super {p0}, Landroid/app/Activity;->onResume()V

    iget-object v0, p0, La/j/a/i;->c:Landroid/os/Handler;

    const/4 v1, 0x2

    invoke-virtual {v0, v1}, Landroid/os/Handler;->sendEmptyMessage(I)Z

    const/4 v0, 0x1

    iput-boolean v0, p0, La/j/a/i;->g:Z

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->i()Z

    return-void
.end method

.method public final onRetainNonConfigurationInstance()Ljava/lang/Object;
    .locals 3

    invoke-virtual {p0}, La/j/a/i;->f()Ljava/lang/Object;

    move-result-object v0

    iget-object v1, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v1}, La/j/a/k;->l()La/j/a/u;

    move-result-object v1

    if-nez v1, :cond_0

    iget-object v2, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    if-nez v2, :cond_0

    if-nez v0, :cond_0

    const/4 v0, 0x0

    return-object v0

    :cond_0
    new-instance v2, La/j/a/i$b;

    invoke-direct {v2}, La/j/a/i$b;-><init>()V

    iput-object v0, v2, La/j/a/i$b;->a:Ljava/lang/Object;

    iget-object v0, p0, La/j/a/i;->e:Landroidx/lifecycle/u;

    iput-object v0, v2, La/j/a/i$b;->b:Landroidx/lifecycle/u;

    iput-object v1, v2, La/j/a/i$b;->c:La/j/a/u;

    return-object v2
.end method

.method protected onSaveInstanceState(Landroid/os/Bundle;)V
    .locals 4

    invoke-super {p0, p1}, Landroidx/core/app/c;->onSaveInstanceState(Landroid/os/Bundle;)V

    invoke-direct {p0}, La/j/a/i;->h()V

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->m()Landroid/os/Parcelable;

    move-result-object v0

    if-eqz v0, :cond_0

    const-string v1, "android:support:fragments"

    invoke-virtual {p1, v1, v0}, Landroid/os/Bundle;->putParcelable(Ljava/lang/String;Landroid/os/Parcelable;)V

    :cond_0
    iget-object v0, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v0}, La/d/j;->b()I

    move-result v0

    if-lez v0, :cond_2

    iget v0, p0, La/j/a/i;->k:I

    const-string v1, "android:support:next_request_index"

    invoke-virtual {p1, v1, v0}, Landroid/os/Bundle;->putInt(Ljava/lang/String;I)V

    iget-object v0, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v0}, La/d/j;->b()I

    move-result v0

    new-array v0, v0, [I

    iget-object v1, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v1}, La/d/j;->b()I

    move-result v1

    new-array v1, v1, [Ljava/lang/String;

    const/4 v2, 0x0

    :goto_0
    iget-object v3, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v3}, La/d/j;->b()I

    move-result v3

    if-ge v2, v3, :cond_1

    iget-object v3, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v3, v2}, La/d/j;->c(I)I

    move-result v3

    aput v3, v0, v2

    iget-object v3, p0, La/j/a/i;->l:La/d/j;

    invoke-virtual {v3, v2}, La/d/j;->e(I)Ljava/lang/Object;

    move-result-object v3

    check-cast v3, Ljava/lang/String;

    aput-object v3, v1, v2

    add-int/lit8 v2, v2, 0x1

    goto :goto_0

    :cond_1
    const-string v2, "android:support:request_indicies"

    invoke-virtual {p1, v2, v0}, Landroid/os/Bundle;->putIntArray(Ljava/lang/String;[I)V

    const-string v0, "android:support:request_fragment_who"

    invoke-virtual {p1, v0, v1}, Landroid/os/Bundle;->putStringArray(Ljava/lang/String;[Ljava/lang/String;)V

    :cond_2
    return-void
.end method

.method protected onStart()V
    .locals 1

    invoke-super {p0}, Landroid/app/Activity;->onStart()V

    const/4 v0, 0x0

    iput-boolean v0, p0, La/j/a/i;->h:Z

    iget-boolean v0, p0, La/j/a/i;->f:Z

    if-nez v0, :cond_0

    const/4 v0, 0x1

    iput-boolean v0, p0, La/j/a/i;->f:Z

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->a()V

    :cond_0
    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->k()V

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->i()Z

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->g()V

    return-void
.end method

.method public onStateNotSaved()V
    .locals 1

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->k()V

    return-void
.end method

.method protected onStop()V
    .locals 1

    invoke-super {p0}, Landroid/app/Activity;->onStop()V

    const/4 v0, 0x1

    iput-boolean v0, p0, La/j/a/i;->h:Z

    invoke-direct {p0}, La/j/a/i;->h()V

    iget-object v0, p0, La/j/a/i;->d:La/j/a/k;

    invoke-virtual {v0}, La/j/a/k;->h()V

    return-void
.end method

.method public startActivityForResult(Landroid/content/Intent;I)V
    .locals 1

    iget-boolean v0, p0, La/j/a/i;->j:Z

    if-nez v0, :cond_0

    const/4 v0, -0x1

    if-eq p2, v0, :cond_0

    invoke-static {p2}, La/j/a/i;->a(I)V

    :cond_0
    invoke-super {p0, p1, p2}, Landroid/app/Activity;->startActivityForResult(Landroid/content/Intent;I)V

    return-void
.end method

.method public startActivityForResult(Landroid/content/Intent;ILandroid/os/Bundle;)V
    .locals 1

    iget-boolean v0, p0, La/j/a/i;->j:Z

    if-nez v0, :cond_0

    const/4 v0, -0x1

    if-eq p2, v0, :cond_0

    invoke-static {p2}, La/j/a/i;->a(I)V

    :cond_0
    invoke-super {p0, p1, p2, p3}, Landroid/app/Activity;->startActivityForResult(Landroid/content/Intent;ILandroid/os/Bundle;)V

    return-void
.end method

.method public startIntentSenderForResult(Landroid/content/IntentSender;ILandroid/content/Intent;III)V
    .locals 1

    iget-boolean v0, p0, La/j/a/i;->i:Z

    if-nez v0, :cond_0

    const/4 v0, -0x1

    if-eq p2, v0, :cond_0

    invoke-static {p2}, La/j/a/i;->a(I)V

    :cond_0
    invoke-super/range {p0 .. p6}, Landroid/app/Activity;->startIntentSenderForResult(Landroid/content/IntentSender;ILandroid/content/Intent;III)V

    return-void
.end method

.method public startIntentSenderForResult(Landroid/content/IntentSender;ILandroid/content/Intent;IIILandroid/os/Bundle;)V
    .locals 1

    iget-boolean v0, p0, La/j/a/i;->i:Z

    if-nez v0, :cond_0

    const/4 v0, -0x1

    if-eq p2, v0, :cond_0

    invoke-static {p2}, La/j/a/i;->a(I)V

    :cond_0
    invoke-super/range {p0 .. p7}, Landroid/app/Activity;->startIntentSenderForResult(Landroid/content/IntentSender;ILandroid/content/Intent;IIILandroid/os/Bundle;)V

    return-void
.end method
