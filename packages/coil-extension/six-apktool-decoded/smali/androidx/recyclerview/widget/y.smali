.class Landroidx/recyclerview/widget/y;
.super Ljava/lang/Object;
.source ""

# interfaces
.implements Ljava/lang/Runnable;


# annotations
.annotation system Ldalvik/annotation/EnclosingClass;
    value = Landroidx/recyclerview/widget/D;
.end annotation

.annotation system Ldalvik/annotation/InnerClass;
    accessFlags = 0x0
    name = null
.end annotation


# instance fields
.field final synthetic a:Landroidx/recyclerview/widget/D;


# direct methods
.method constructor <init>(Landroidx/recyclerview/widget/D;)V
    .locals 0

    iput-object p1, p0, Landroidx/recyclerview/widget/y;->a:Landroidx/recyclerview/widget/D;

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method


# virtual methods
.method public run()V
    .locals 2

    iget-object v0, p0, Landroidx/recyclerview/widget/y;->a:Landroidx/recyclerview/widget/D;

    iget-object v0, v0, Landroidx/recyclerview/widget/D;->W:Landroidx/recyclerview/widget/D$e;

    if-eqz v0, :cond_0

    invoke-virtual {v0}, Landroidx/recyclerview/widget/D$e;->i()V

    :cond_0
    iget-object v0, p0, Landroidx/recyclerview/widget/y;->a:Landroidx/recyclerview/widget/D;

    const/4 v1, 0x0

    iput-boolean v1, v0, Landroidx/recyclerview/widget/D;->xa:Z

    return-void
.end method
